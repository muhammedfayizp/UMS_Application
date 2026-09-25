import { pubApi } from "../api/api"

export const userSignUp= async(data)=>{
    const res=await pubApi.post('/auth/signup',data)
    return res
}

export const userLogin=async(data)=>{
    const res = await pubApi.post('/auth/login',data)
    return res
}