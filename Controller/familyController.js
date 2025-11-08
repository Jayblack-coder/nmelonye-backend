import bcrypt from 'bcryptjs';
import { Family } from '../Modules/familyModule.js';
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

        // Create a token
        // const token = jwt.sign({ id: user._id.toString() }, SECRET_KEY, {
        //     expiresIn: '1hr',
        // });

        // Send response with token and user data
        return res.status(200).json({
            user: {
                id: user._id,
                surname: user.surname,
                firstName: user.firstName,
                middleName: user.middleName,
                familyStatus: user.familyStatus,
                userName: user.userName,
                password: user.password,
                parents: user.parents,
                generation: user.generation,
                dateOfBirth: user.generation,
                spouse: user.spouse,
                cityOfResidence: user.cityOfResidence,
                offspring: user.offspring
            },
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error logging in", error });
    }
};


//GET Member by ID
export const  getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const family = await Family.findById(id);
        res.status(200).json(family);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};


//GET ALL Members
export const getAllUsers = async (req, res) => {
    try {
        const family = await Family.find({});
        res.status(200).json(family)
    } catch (error) {
     res.status(500).json({message: error.message});   
    }
};




 export const findByIdAndUpdate = async (req,res) => {
    try {
        const {id} = req.params;
        const updatedfamily = await Family.findByIdAndUpdate(id, req.body);
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
