import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Tasker } from '../models/tasker.models.js';
import { taskerSchema } from '../schema/tasker.schema.js';



// Tasker Sign-Up
export const signUpTasker = async (req, res) => {
  try {
    const { firstName, lastName, email, password, selectACategory, termsAccepted } = req.body;

    // Check if the email is already taken
    const existingTasker = await Tasker.findOne({ email });
    if (existingTasker) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new tasker
    const newTasker = new Tasker({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      selectACategory,
      termsAccepted
    });

    await newTasker.save();
    res.status(201).json({ message: 'Tasker registered successfully' });
  } catch (error) {
    console.error('ERror during user sign-up:', error.message);
      console.error(error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const loginTasker = async (req, res) => {
  try {
    const { email, password } = req.body;

    const tasker = await Tasker.findOne({ email });
    if (!tasker) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, tasker.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: tasker._id, email: tasker.email }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during user login:', error); // Log the full error object
    res.status(500).json({ error: 'Internal server error' });
  }
};