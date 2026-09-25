import express from 'express'
import cors from 'cors'
import authRoute from './routes/authRoutes.js';

const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))
app.use(express.json());

app.use("/auth", authRoute);
// app.use("/users", userRoutes);

export default app;