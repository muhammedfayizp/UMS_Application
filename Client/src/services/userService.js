import { pvtApi } from "../api/api"

export const getUsers = async()=>{
    const res= await pvtApi.get('/user/getUsers')
    return res
}

export const deleteUser = async(id)=>{    
    const res= await pvtApi.delete(`/user/${id}`)
    return res
}

export const editUser = async(id,userData)=>{
    console.log(id,userData);
    
    const res = await pvtApi.patch(`/user/${id}`,userData)
    return res
}