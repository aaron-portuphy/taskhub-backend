import { Schema, model, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const taskSchema = new Schema({
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    selectACategory: {type: String, required: true},
    termsAccepted: {type: Boolean, required: true},
    createdAt: {type: Date, default: Date.now}
},
{
    timestamps: true
}
)

taskSchema.plugin(toJSON);
export const Tasker = model('Tasker', taskSchema);