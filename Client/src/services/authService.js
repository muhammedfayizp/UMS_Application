import { pubApi } from "../api/api"

export const userSignUp= async(data)=>{
    const res=await pubApi.post('/auth/signup',data)
    return res
}