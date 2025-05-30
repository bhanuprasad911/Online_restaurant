import express from 'express'
import {addUser, getAllUsers} from '../controllers/userController.js'
const userRouter = express.Router()

userRouter.get('/', getAllUsers)
userRouter.post('/add',addUser)





export default userRouter