import { userSignup } from "../service/authService.js"

export const signup=async(req,res)=>{
    try {

        const resp=await userSignup(req.body)
        return res.status(201).json({
            success:true,
            message:'user signed successfully',
            data:resp
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:  "User signup failed"
        })
    }
}