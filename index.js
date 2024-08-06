import express from 'express';
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from 'body-parser';
import { taskerRouter } from './routes/tasker.route.js';
import { userRouter } from './routes/user.route.js'

const app = express();

//Middleware
app.use(express.json()); 

//Routes
app.use('/api/tasker', taskerRouter);
app.use('/api/user', userRouter);

//Mongo Connection
await mongoose.connect(process.env.MONGO_URL);
console.log('Database is connected');

const port = process.env.PORT || 3030;


//Server Listening
app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
});