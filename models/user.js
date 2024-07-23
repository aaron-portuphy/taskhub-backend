import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    zipcode: {type: Number, required: true}
})

userSchema.plugin(toJSON)
export const UserModel = model('User', userSchema )
