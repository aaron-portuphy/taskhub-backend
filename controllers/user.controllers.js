import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { User } from '../models/user.models.js'
import { userSchema } from '../schema/user.schema.js';


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
      console.error('ERror during user sign-up:', error.message);
      console.error(error.stack);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  export const loginUser = async (req, res) => {
    try { 
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during user login:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };