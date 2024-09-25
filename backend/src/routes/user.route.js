import express from 'express'
import {register, login, getCurrentUser, updateAccountDetails, updateUserAvatar} from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middleware.js'
import { tokenVerify } from '../middlewares/jwt.js';

const userRouter = express.Router();

userRouter.post('/register',upload.single('avatar'), register)
userRouter.post('/login', login)
userRouter.get('/profile/',tokenVerify, getCurrentUser)
userRouter.patch('/update-profile',tokenVerify, updateAccountDetails)
userRouter.patch('/update-avatar',tokenVerify,upload.single("avatar"), updateUserAvatar)

export default userRouter

