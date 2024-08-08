import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String, required: true, unique: true, sparse: true }, // Correct field name
    password: { type: String, required: true, minlength: 6 },
    createdAt: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  });
  
  userSchema.plugin(toJSON);
  export const User = model('User', userSchema);
  