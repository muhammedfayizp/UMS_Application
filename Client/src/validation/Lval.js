export const vallog= (formData)=>{
    const err = {}
    
    if(!formData.email.trim()){
        err.email = 'Email field is required'
    } else if(
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ){
        err.email ='Invalid email address'
    }

    if(!formData.password){
        err.password='Password field is required'
    }else if(formData.password.length < 6){
        err.password='at least 6 characters needed'
    }
    return err;

}