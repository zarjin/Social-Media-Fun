import express from 'express';
import {
  createPost,
  deletePost,
  updatePost,
  commentsPost,
  likesPost,
  getAllPost,
} from '../controllers/post.controller.js';
import Authentication from '../middlewares/authentication.middleware.js';
import { postImage } from '../middlewares/upload.middleware.js';

const postRouter = express.Router();

// Create a post (with image upload)
postRouter.post(
  '/create',
  Authentication,
  postImage.single('postImage'),
  createPost
);

// Update a post (with optional new image upload)
postRouter.put(
  '/update/:id',
  Authentication,
  postImage.single('postImage'),
  updatePost
);

// Delete a post
postRouter.delete('/delete/:id', Authentication, deletePost);

// Add comment to a post
postRouter.post('/comment/:postId', Authentication, commentsPost);

// Like / Unlike a post
postRouter.put('/like/:id', Authentication, likesPost);

// Get all posts
postRouter.get('/all', Authentication, getAllPost);

export default postRouter;
