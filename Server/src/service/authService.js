import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const userSignup = async (userData) => {
    const { name, email, password, cPassword } = userData

    if (password !== cPassword) {
        throw new Error('password do not match to confirmPassword', 409)
    }
    const exiUser = await User.findOne({ email })

    if (exiUser) {
        const error = new Error('email is already exist')
        throw error
    }

    const hashPass = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        name,
        email,
        password: hashPass,
        role: 'user'
    })
    if(!newUser){
        const error = new Error('user signup failed')
        throw error
    }

    return newUser

}

export const userLogin = async (data)=>{
    const {email,password}=data

    const existUser= await User.findOne({email})
    
    if(!existUser){
        const err=new Error('invalid email or password')
        err.statusCode=401
        throw err
    }

    const corssPass=await bcrypt.compare(password,existUser.password)

    if(!corssPass){
        const err =new Error('incorect password user not found')
        err.statusCode = 409
        throw err
    }

    const genAcTok = jwt.sign({userId:existUser._id, role:existUser.role},process.env.JWT_SECRET,{expiresIn:'30m'})    
    const genRFTok = jwt.sign({userId:existUser._id,role:existUser.role}, process.env.REFRESH_TOKEN_SECRET,{expiresIn:'2d'})
    
    
    return {existUser,accessToken:genAcTok,refreshToken:genRFTok}
}

export const refUserToken=async(refreshToken)=>{
    if(!refreshToken){
        const err=new Error('refreshToken is missing')
        err.statusCode=401
        throw err
    }

    const decoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    const user= await User.findById(decoded.userId)

    if(!user){
        const err=new Error('user Not found')
        err.statusCode=401
        throw err
    }

    const accessToken=jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'30m'})
    return{user,accessToken}
}