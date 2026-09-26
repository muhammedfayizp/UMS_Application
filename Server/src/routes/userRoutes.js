import express from 'express'
import { deleteUser, editUser, getUsers } from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


const userRoutes=express.Router()

userRoutes.get('/getUsers',authMiddleware,getUsers)
userRoutes.delete('/:id',authMiddleware,deleteUser)
userRoutes.patch('/:id',authMiddleware,editUser)


export default userRoutes