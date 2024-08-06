// controllers/authController.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Tasker } from '../models/Tasker.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register User
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Register Tasker
export const registerTasker = async (req, res) => {
  const { firstName, lastName, email, password, selectACategory } = req.body;

  try {
    const taskerExists = await Tasker.findOne({ email });

    if (taskerExists) {
      return res.status(400).json({ message: 'Tasker already exists' });
    }

    const tasker = await Tasker.create({
      firstName,
      lastName,
      email,
      password,
      selectACategory,
    });

    if (tasker) {
      res.status(201).json({
        _id: tasker._id,
        firstName: tasker.firstName,
        lastName: tasker.lastName,
        email: tasker.email,
        token: generateToken(tasker._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid tasker data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error registering tasker', error });
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
};

// Tasker Login
export const loginTasker = async (req, res) => {
  const { email, password } = req.body;

  try {
    const tasker = await Tasker.findOne({ email });

    if (tasker && (await tasker.matchPassword(password))) {
      res.json({
        _id: tasker._id,
        firstName: tasker.firstName,
        lastName: tasker.lastName,
        email: tasker.email,
        token: generateToken(tasker._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in tasker', error });
  }
};