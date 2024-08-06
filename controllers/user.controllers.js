import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { User } from '../models/user.js'


// User Sign-Up
export const signUpUser = async (req, res) => {
    try {
      const { firstName, lastName, email, phoneNumber, password } = req.body;
  
      // Check if the email or phone number is already taken
      const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Email or phone number already in use' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };