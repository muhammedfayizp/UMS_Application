import express from 'express'
import { login, refToken, signup } from '../controllers/authController.js'
const authRoute=express.Router()


authRoute.post('/signup',signup)
authRoute.post('/login',login)
authRoute.post('/refresh-token',refToken)

export default authRoute