import express from 'express';
import {
  deletedUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  getUser,
  getAllUser,
  followingFollower,
  yourLikePost,
} from '../controllers/user.controller.js';
import Authentication from '../middlewares/authentication.middleware.js';
import { userImage } from '../middlewares/upload.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/logout', logoutUser);

userRouter.post(
  '/update',
  Authentication,
  userImage.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  updateUser
);

userRouter.delete('/delete', Authentication, deletedUser);

userRouter.get('/getUser', Authentication, getUser);

userRouter.get('/getAllUser', getAllUser);

userRouter.post('/following/:followerId', Authentication, followingFollower);

userRouter.post('/likePost/:postId', Authentication, yourLikePost);

export default userRouter;
