import User from "../models/User.js"
import bcrypt from "bcryptjs"

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