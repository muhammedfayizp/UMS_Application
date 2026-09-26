export const valEdit=(formData) => {
    const err={};

    if(!formData.name.trim()){
        err.name= 'Name field is required'
    }else if(formData.name.trim().length < 3){
        err.name='at least 3 characters needed'
    }else if(!/^[A-Za-z\s]+$/.test(formData.name)){
        err.name='only contain letters and spaces'
    }

    if(!formData.email.trim()){
        err.email="Email field is required"
    }else if(
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ){
        err.email='Invalid email address'
    }
    return err;

}