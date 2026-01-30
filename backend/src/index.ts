import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { redisConnection } from './config/redis';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Redis status: ${redisConnection.status}`);
});
