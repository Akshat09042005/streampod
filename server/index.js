import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';

//routes
import authRoutes from './routes/auth.js';
import podcastsRoutes from './routes/podcast.js';
import userRoutes from './routes/user.js';

const app = express();

// Middleware for parsing request body
app.use(express.json({limit:"1gb"}));

// Middleware for handeling CORS policy
app.use(cors());

//MongoDB Connection Function
const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.mongoDB_URL).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.log(err);
    });
};

app.use("/api/auth", authRoutes)
app.use("/api/podcasts", podcastsRoutes)
app.use("/api/user", userRoutes)

//Error Handling Middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

//Server Initialization
app.listen(process.env.PORT, () => {
    console.log(`App is listening to port: ${process.env.PORT}`);
    console.log("Connected");
    connect();
})
