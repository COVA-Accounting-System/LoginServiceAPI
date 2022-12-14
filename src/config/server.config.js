import express, { urlencoded } from 'express';
import cors from 'cors'
import morgan from 'morgan'
import userRouter from '../routes/user.route.js';
import authRouter from "../routes/auth.route.js"
import './db.config.js'


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.json("This is the authentication server");
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter)

export default app;