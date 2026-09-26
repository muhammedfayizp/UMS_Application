import { fetchUsers, removeUser, userEdit } from "../service/userService.js"

export const getUsers=async(req,res)=>{
    try {
        const resp=await fetchUsers()
        res.status(200).json({
            success: true,
            data: resp,
        })
    } catch (err) {
        res.status(err.statusCode||500).json({
            success: false,
            message: err.message,
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await removeUser(id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("Delete user error:", error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Failed to delete user",
        });
    }
};

export const editUser = async(req,res)=>{
    try {
        const {id}=req.params
        const resp=await userEdit(id,req.body)
        res.status(200).json({
            success: true,
            message: "userData updated successfully",
            data: resp,
        });
    } catch (err) {
        res.status(err.statusCode||500).json({
            success: false,
            message: err.message,
        })
    }
}