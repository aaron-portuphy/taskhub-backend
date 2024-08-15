import express from 'express';
import mongoose from 'mongoose';
import expressOasGenerator from '@mickeymond/express-oas-generator';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cors from 'cors';
import 'dotenv/config';
import { taskerRouter } from './routes/tasker.route.js';
import { userRouter } from './routes/user.route.js';
import { bookingsRoutes } from './routes/bookings.route.js';

const app = express();

app.use(cors({ credentials: true, origin: '*' }));

expressOasGenerator.handleResponses(app, {
  alwaysServeDocs: true,
  tags: ['User', 'Tasker'],
  mongooseModels: mongoose.modelNames(),
});

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Routes
app.use('/api/tasker', taskerRouter);
app.use('/api/user', userRouter);
app.use('/api', bookingsRoutes)

expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect('/api-docs/'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // Store session
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

// Mongo Connection
await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Database is connected');

const port = process.env.PORT || 3030;

// Server Listening
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
