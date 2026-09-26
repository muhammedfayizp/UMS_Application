import User from "../models/User.js"

export const fetchUsers = async ()=>{
    const usersData = await User.find()
    return usersData
}

export const removeUser = async (id) => {
    const user = await User.findById(id);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    if (user.role === "admin") {
        const error = new Error("Admin cannot be deleted");
        error.statusCode = 403;
        throw error;
    }

    await User.findByIdAndDelete(id);

    return user;
};

export const userEdit = async(id,userData)=>{
    const {name,email}=userData
    console.log(name,email);
    

    const user=await User.findById(id)
    if (!user) {
        const err= new Error('user not found')
        err.statusCode = 404; throw err;
    }
    if (name !== undefined) { user.name = name} 
    if (email !== undefined) { user.email = email}
    const updatedUser = await user.save()
    return updatedUser
}