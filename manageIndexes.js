import mongoose from 'mongoose';
import { config } from 'dotenv';
import { User } from './models/user.models.js'; // Adjust the path to your User model

// Load environment variables from .env file
config(); 

async function manageIndexes() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error('MONGO_URL is not defined in the environment variables');
    }

    await mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected...');
    
    await User.collection.dropIndexes();
    console.log('Dropped all indexes.');
    
    await User.createIndexes();
    console.log('Recreated indexes.');
  } catch (err) {
    console.error('Error managing indexes:', err);
  } finally {
    mongoose.disconnect();
  }
}

manageIndexes();
