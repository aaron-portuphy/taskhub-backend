import { Schema, model, Types } from 'mongoose';
import { toJSON } from "@reis/mongoose-to-json";

const bookingsSchema = new Schema({
  location: {streetAddress: String, houseOrAptNumber: String,},
  taskOptions: {size: {type: String, enum: ['Small', 'Medium', 'Large'],}, details: String, summary: String,},
  taskDate: {type: Date, required: true,},
  startTime: {type: String, required: true,},
  user: {type: Types.ObjectId, ref: 'User', select: false}
});

bookingsSchema.plugin(toJSON);
export const Bookings = model('Bookings', bookingsSchema)

