import bcrypt from 'bcrypt';
import { Tasker } from '../models/tasks.js';



// Tasker Sign-Up
export const signUpTasker = async (req, res) => {
  try {
    const { firstName, lastName, email, password, area, category, termsAccepted } = req.body;

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
      area,
      category,
      termsAccepted
    });

    await newTasker.save();
    res.status(201).json({ message: 'Tasker registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
