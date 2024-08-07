import express from 'express';
import mongoose from "mongoose";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import cors from "cors";
import "dotenv/config";
import { taskerRouter } from './routes/tasker.route.js';
import { userRouter } from './routes/user.route.js'

const app = express();

app.use(cors({credentials: true, origin: '*'}));

expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['User','Tasker'],
    mongooseModels: mongoose.modelNames(), 
})

//Middleware
app.use(express.json()); 




// Health check endpoint
app.get('/api/health', (req, res)=>{
    res.json({status: "UP"});
})

//Routes
app.use('/api/tasker', taskerRouter);
app.use('/api/user', userRouter);

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));

//Mongo Connection
await mongoose.connect(process.env.MONGO_URL);
console.log('Database is connected');

const port = process.env.PORT || 3030;


//Server Listening
app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`)
});