import mongoose from 'mongoose';
import { config } from 'dotenv';
import { User } from './models/user.models.js'; // Adjust the path to your User model

config(); // Load environment variables from .env file

async function cleanup() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_URL is not defined in the environment variables');
    }

    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected...');
    
    const usersWithNullPhoneNumbers = await User.find({ phoneNumber: null });
    if (usersWithNullPhoneNumbers.length > 0) {
      console.log(`Found ${usersWithNullPhoneNumbers.length} users with null phone numbers:`, usersWithNullPhoneNumbers);
    } else {
      console.log('No users with null phone numbers found.');
    }
    
    const result = await User.deleteMany({ phoneNumber: null });
    console.log(`Deleted ${result.deletedCount} users with null phone numbers.`);
  } catch (err) {
    console.error('Error cleaning up the database:', err);
  } finally {
    mongoose.disconnect();
  }
}

cleanup();
