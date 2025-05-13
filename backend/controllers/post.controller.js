import postModel from '../models/post.models.js';
import userModel from '../models/user.models.js';

// Create Post
export const createPost = async (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;

  try {
    if (!title || !req.file) {
      return res.status(400).json({ message: 'Title and image are required.' });
    }

    const post = new postModel({
      title,
      postImage: req.file.path,
      createPostBy: userId,
    });

    await post.save();

    const user = await userModel.findById(userId);
    user.yourPost.push(post._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Post created successfully.',
      data: post,
    });
  } catch (error) {
    console.error(`Create Post Error: ${error}`);
    res.status(500).json({ message: 'Server error while creating post.' });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const updatedPost = await postModel.findByIdAndUpdate(
      id,
      {
        title,
        ...(req.file && { postImage: req.file.path }),
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully.',
      data: updatedPost,
    });
  } catch (error) {
    console.error(`Post Update Error: ${error}`);
    res.status(500).json({ message: 'Server error while updating post.' });
  }
};

// Delete Post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully.',
    });
  } catch (error) {
    console.error(`Post Delete Error: ${error}`);
    res.status(500).json({ message: 'Server error while deleting post.' });
  }
};

// Add Comment to Post
export const commentsPost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const { text } = req.body;

  try {
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required.' });
    }

    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const newComment = {
      user: userId,
      text,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully.',
      comment: newComment,
    });
  } catch (error) {
    console.error(`Add Comment Error: ${error}`);
    res.status(500).json({ message: 'Server error while adding comment.' });
  }
};

// Like / Unlike Post
export const likesPost = async (req, res) => {
  const userId = req.user.id;
  const { id: postId } = req.params;

  try {
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter((id) => id !== userId);
      await post.save();
      return res.status(200).json({
        success: true,
        message: 'Post unliked successfully.',
      });
    } else {
      // Like
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({
        success: true,
        message: 'Post liked successfully.',
      });
    }
  } catch (error) {
    console.error(`Toggle Like Error: ${error}`);
    res.status(500).json({ message: 'Server error while toggling like.' });
  }
};

// Get All Posts
export const getAllPost = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate('createPostBy', 'username email') // Adjust fields you need
      .populate('comments.user', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error(`Get All Posts Error: ${error}`);
    res.status(500).json({ message: 'Server error while fetching posts.' });
  }
};
