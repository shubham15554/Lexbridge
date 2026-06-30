import express from "express";
const router = express.Router();
import User from '../models/user.js'
import { createSecretToken } from "../utils/createToken.js";
import {signup , login , logout , profile , googleLogin} from "../controllers/user.js";



router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout" , logout);
router.get('/profile' , profile);
router.post('/googleAuth' , googleLogin);

export default router