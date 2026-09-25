import axios from "axios";


const BACK_URL=import.meta.env.VITE_BACKEND_URL

export const pubApi= axios.create({
    baseURL:BACK_URL,
    withCredentials:true
})


export const pvtApi=axios.create({
    baseURL:BACK_URL,
    withCredentials:true
    
})


pvtApi.interceptors.request.use((config)=>{
    console.log("hello");
    
    const token =store.getState().auth.token
    console.log("Request Token:", token);

    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
},
(error)=>Promise.reject(error)
)

pvtApi.interceptors.response.use((response)=>response,async(err)=>{
    const ogReq=err.config

    if(err.response?.status==401&&!ogReq._retry){
        console.log("Access token expired");
        ogReq._retry=true
            try {
                const res=await pubApi.post('/auth/refresh-token')

                store.dispatch(
                    loginSuccess({
                        user:res.data.user,
                        token:res.data.accessToken
                    })
                )
                ogReq.headers=ogReq.headers||{}
                ogReq.headers.Authorization=`Bearer ${res.data.accessToken}`

                return pvtApi(ogReq)

            } catch (err) {
                console.log('Refresh token error', err);

                store.dispatch(logout());
                return Promise.reject(err);
            }
        }
    return Promise.reject(err)
})