const bcrypt = require("bcrypt");
const User = require("../module/userModule.js");
const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.JWT_SECRET || 'your secret key'
//register user

const registerUser = async (req, res) => {
    try {
        let { name, email, userName, password, phoneNumber, sex, maritalStatus} =
        req.body;
        //validate required fields
        if (
            !name ||
            !email||
            !userName||
            !password||
            !phoneNumber||
            !sex||
            !maritalStatus )
             {
            return res.status(400)
            .json({ message: "All Required Fields must Be Provided"});
        }
// Hash the password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// save user in database
const newUser = new User({
    name,
    email,
    userName,
    password: hashedPassword,
    phoneNumber,
    sex,
    maritalStatus,
});

//Register USER IN DATABASE
const registeredUser = await newUser.save();
res.status(201).json(registeredUser);
 // Create a token
 const token = jwt.sign({ id: newUser._id.toString() }, SECRET_KEY, {
    expiresIn: '1hr',
});

// Send response with token and user data
return res.status(200).json({
    token,
    newUser: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        sex: newUser.sex,  
        maritalStatus: newUser.maritalStatus, 
        name: newUser.name,
    },
});



} catch (err) {
    console.error("registration Error", err);
    //handle duplicate key errors
    if (err.code === 1100) {
        return res.status(400).json({
            message: "Duplicate value",
            field: Object.keys(err.keyValue),
        });
    }
    res.status(500)
    .json({ message: "Error registering user", err: err.message});
}
};


//login user

const loginuser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "USERNAME not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Create a token
        const token = jwt.sign({ id: user._id.toString() }, SECRET_KEY, {
            expiresIn: '1hr',
        });

        // Send response with token and user data
        return res.status(200).json({
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                sex: user.sex,  
                maritalStatus: user.maritalStatus, 
                name: user.name,
            },
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error logging in", error });
    }
};

//update user

const updateUser = async (req, res) => {
    try {
         const {id}= req.params;
        //find user by id
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        //find user fields
        const updatedData = req.body;

        //only hash password if its being updated
        if (updatedData.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(updatedData.password, salt)
        }

        //update user in the database
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true, // return the updated document
            runValidators: true, //enforce validators rule
        });
        res.status(200)
        .json({ message: "User Updated Successfully", updatedUser});
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500)
        .json({ message: "Error Updating User", error: error.message});
    }
};
//GET ALL PRODUCT
const getAllUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user)
    } catch (error) {
     res.status(500).json({message: error.message});   
    }
};

// DELETE USER

let deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        //check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        //Delete the user
        await user.deleteOne();
        res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        console.error( "Error deleting user", error);
        res.status(500)
        .json({ message: "Error deleting user", error: error.message })
    }
};
module.exports = {
    registerUser, loginuser, getAllUsers, updateUser, deleteUser
}