import bcrypt from 'bcrypt';
import { Tasker } from '../models/tasker.models.js';



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
