import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import credentials from './middlewares/credentials.js';
import corsOptions from './configs/corsOption.js';
import mongoose from 'mongoose';

import authRoute from "./routes/auth.js"

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected."))
  .catch((error) => console.error(error));

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);

server.listen(process.env.PORT, () => {
    console.log(`Express is running on port: ${process.env.PORT || 3000}.`);
  });