import express from 'express';
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
await mongoose.connect(process.env.MONGO_URL);
console.log('Database is connected');

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
});