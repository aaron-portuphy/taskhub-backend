import { Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const taskSchema = new Schema({
    name:{type: String},
    price:{type: String},
    flierUrl:{type: String}
})