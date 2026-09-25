import { refUserToken, userLogin, userSignup } from "../service/authService.js"

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

export const login= async(req,res)=>{
    try {
        const resp=await userLogin(req.body)
        res.cookie('refreshToken',resp.refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge: 2 * 24 * 60 * 60 * 1000,
        })

        if(resp.existUser.role!=='admin'){
            res.status(200).json({
                success:true,
                message:'user logged successfully',
                data:resp
            })
        }else{
            res.status(200).json({
                success:true,
                message:'admin logged successfully',
                data:resp
            })
        }
    } catch (error) {
        res.status(error.statusCode||500).json({
            success:false,
            message:error.message
        })
    }
}

export const refToken=async(req,res)=>{
    try {
        const resp= await refUserToken(req.cookies.refreshToken)
        res.status(200).json({
            success:true,
            user:resp.user,
            accessToken:resp.accessToken
        })
    } catch (err) {
        res.status(err.statusCode||500).json({
            success:false,
            message:err.message
        })
    }
}