import express, { response } from "express";
import dotenv from "dotenv"
import cors from "cors"

import bodyParser from "body-parser";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";

import { CallTracker } from "assert";
import gameRoutes from "./Routes/gameRoutes.js"
import authRoutes from "./auth/authRoutes.js"
import avatarRoutes from "./Routes/avatarRoutes.js"
import reviewRoutes from "./Routes/reviewRoutes.js";

dotenv.config({ path: '../.env' });
const app=express();

const port=process.env.PORT;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));
app.use(express.json()); 
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/blopsReviews', express.static('blopsReviews')); 




app.use('/games', gameRoutes);
  

app.use("/auth", authRoutes);


app.use("/avatar",avatarRoutes);

app.use("/reviews",reviewRoutes);



app.listen(port,()=>{
    console.log(`listening`);
})







