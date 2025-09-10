import bcrypt from 'bcryptjs';
import { Family } from '../Modules/familyModule.js';

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
      offspring
    });

    await newUser.save();
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};