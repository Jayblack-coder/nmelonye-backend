import bcrypt from 'bcryptjs';
import { Family } from '../Modules/familyModule.js';
import jwt from "jsonwebtoken";
// import upload from "../upload.js";


// Register user
export const registerUser = async (req, res) => {
  try {
    const {
      surname,
      firstName,
      middleName,
      familyStatus,
      userName,
      password,
      parents,
      generation,
      dateOfBirth,
      spouse,
      cityOfResidence,
      offspring
    } = req.body;

    // Validate required fields
    if (
      !surname ||
      !firstName ||
      !familyStatus ||
      !userName ||
      !password ||
      !parents ||
      !generation ||
      !dateOfBirth ||
      !cityOfResidence
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Check if username already exists
    const existingUser = await Family.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
const imageUrl = req.file ? req.file.path : null;
 
    // Create new user
    const newUser = new Family({
      surname,
      firstName,
      middleName,
      familyStatus,
      userName,
      password: hashedPassword,
      parents,
      generation,
      dateOfBirth,
      spouse,
      cityOfResidence,
      offspring,
       image: imageUrl, // ✅ save path
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

export const loginuser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Find the user by username
    const user = await Family.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "USERNAME not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ✅ Auto-assign admin role for your account(s)
    const adminUsers = ["ejimo"]; // 👈 put your admin usernames here
    if (adminUsers.includes(user.userName.toLowerCase())) {
      user.isAdmin = true;
      user.role = "admin";
      await user.save();
    } else {
      user.role = "member";
      await user.save();
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.familyStatus },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    // ✅ Clean response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        surname: user.surname,
        firstName: user.firstName,
        middleName: user.middleName,
        familyStatus: user.familyStatus,
        userName: user.userName,
        parents: user.parents,
        generation: user.generation,
        dateOfBirth: user.dateOfBirth,
        spouse: user.spouse,
        cityOfResidence: user.cityOfResidence,
        offspring: user.offspring,
        image: user.image,
        role: user.role,
        isAdmin: user.isAdmin
      },
    });
  } catch (error) {
    console.error("Login error:", error);
   return res.status(500).json({
  message: "Error logging in",
  error: error.message,
  stack: error.stack
});
  }
};





//GET Member by ID
export const  getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const family = await Family.findById(id);
        if (!family) {
          return res.status(404).json({ message: "User not found" });
        }
        // Hide role from public API
        const { role, ...userWithoutRole } = family.toObject();
        res.status(200).json(userWithoutRole);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};


//GET ALL Members
export const getAllUsers = async (req, res) => {
    try {
      res.set("Cache-Control", "no-store"); // 🔥 important

        const family = await Family.find({});
        // Hide role from public API
        const sanitizedFamily = family.map(user => {
          const { role, ...userWithoutRole } = user.toObject();
          return userWithoutRole;
        });
        res.status(200).json(sanitizedFamily)
    } catch (error) {
     res.status(500).json({message: error.message});   
    }
};




 export const findByIdAndUpdate = async (req,res) => {
    try {
        const {id} = req.params;

        if (req.user?._id.toString() !== id && !req.user?.isAdmin) {
            return res.status(403).json({ message: "You can only update your own profile" });
        }

        if (req.body.offspring && typeof req.body.offspring === "string") {
            try {
                req.body.offspring = JSON.parse(req.body.offspring);
            } catch (err) {
                // keep original string if parsing fails
            }
        }

        const updatedfamily = await Family.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedfamily) {
            return res.status(404).json({message:"member not found"});
        }
        res.status(200).json(updatedfamily);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};


export const Create = async (req, res) => {
  try {
    const family = await Family.create(req.body);

    res.status(201).json({
      success: true,
      message: "Family member created successfully",
      data: { family }, // model wrapped inside "data"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const findByIdAndDelete = async (req,res) => {
    try {
        const {id} = req.params;
        const family = await Family.findByIdAndDelete(id, req.body);
        if (!family) {
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

// ✅ Update Profile Picture
export const updateProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const user = await Family.findByIdAndUpdate(
      id,
      { image: req.file.path },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile picture updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all Nwankwo family members
export const getNwankwoUsers = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const family = await Family.find({ surname: { $regex: /^Nwankwo$/i } });
    // Hide role from public API
    const sanitizedFamily = family.map(user => {
      const { role, ...userWithoutRole } = user.toObject();
      return userWithoutRole;
    });
    res.status(200).json(sanitizedFamily);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all Asouzu family members
export const getAsouzuUsers = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const family = await Family.find({ surname: { $regex: /^Asouzu$/i } });
    // Hide role from public API
    const sanitizedFamily = family.map(user => {
      const { role, ...userWithoutRole } = user.toObject();
      return userWithoutRole;
    });
    res.status(200).json(sanitizedFamily);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all Udorji family members
export const getUdorjiUsers = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const family = await Family.find({ surname: { $regex: /^Udorji$/i } });
    // Hide role from public API
    const sanitizedFamily = family.map(user => {
      const { role, ...userWithoutRole } = user.toObject();
      return userWithoutRole;
    });
    res.status(200).json(sanitizedFamily);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all Okoli family members
export const getOkoliUsers = async (req, res) => {
  try {
    res.set("Cache-Control", "no-store");
    const family = await Family.find({ surname: { $regex: /^Okoli$/i } });
    // Hide role from public API
    const sanitizedFamily = family.map(user => {
      const { role, ...userWithoutRole } = user.toObject();
      return userWithoutRole;
    });
    res.status(200).json(sanitizedFamily);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get any family line by surname parameter
export const getFamilyLineUsers = async (req, res) => {
  try {
    const { surname } = req.params;
    res.set("Cache-Control", "no-store");
    const family = await Family.find({ surname: { $regex: new RegExp(`^${surname}$`, "i") } });
    // Hide role from public API
    const sanitizedFamily = family.map(user => {
      const { role, ...userWithoutRole } = user.toObject();
      return userWithoutRole;
    });
    return res.status(200).json(sanitizedFamily);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
