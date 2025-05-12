import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import userModel from '../models/user.models.js';
import postModel from '../models/post.models.js';

// Register User
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(`Register error: ${error}`);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = JWT.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(`Login error: ${error}`);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(`Logout error: ${error}`);
    res.status(500).json({ message: 'Logout failed' });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const userId = req.user.id;
  const { bio, workAt, address, relationshipStatus } = req.body;

  try {
    const profileImage = req.files?.profileImage?.[0]?.path || null;
    const coverImage = req.files?.coverImage?.[0]?.path || null;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        profileImage,
        coverImage,
        bio,
        workAt,
        address,
        relationshipStatus,
      },
      { new: true }
    );

    const { password, ...safeUser } = updatedUser._doc;

    res
      .status(200)
      .json({ message: 'User updated successfully', user: safeUser });
  } catch (error) {
    console.error(`Update error: ${error}`);
    res.status(500).json({ message: 'User update failed' });
  }
};

// Delete User
export const deletedUser = async (req, res) => {
  const userId = req.user.id;

  try {
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(`Delete error: ${error}`);
    res.status(500).json({ message: 'User deletion failed' });
  }
};

// Get Single User
export const getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...safeUser } = user._doc;
    res.status(200).json(safeUser);
  } catch (error) {
    console.error(`Get user error: ${error}`);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

// Get All Users
export const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(`Get all users error: ${error}`);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Follow/Unfollow User
export const followingFollower = async (req, res) => {
  const followingId = req.user.id;
  const { followerId } = req.params;

  try {
    const followingUser = await userModel.findById(followingId);
    const isAlreadyFollowing = followingUser.following.includes(followerId);
    const operation = isAlreadyFollowing ? '$pull' : '$push';

    await userModel.findByIdAndUpdate(
      followingId,
      { [operation]: { following: followerId } },
      { new: true }
    );

    await userModel.findByIdAndUpdate(
      followerId,
      { [operation]: { followers: followingId } },
      { new: true }
    );

    const message = isAlreadyFollowing
      ? 'Unfollowed successfully'
      : 'Followed successfully';

    res.status(200).json({ message });
  } catch (error) {
    console.error(`Follow/Unfollow error: ${error}`);
    res.status(500).json({ message: 'Follow/Unfollow operation failed' });
  }
};

// Like a post
export const yourLikePost = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Prevent duplicate likes
    if (user.yourLikePost.includes(postId)) {
      return res.status(400).json({ message: 'Post already liked.' });
    }

    user.yourLikePost.push(postId);
    await user.save();

    return res.status(200).json({
      message: 'Post liked successfully.',
      yourLikedPosts: user.yourLikePost,
    });
  } catch (error) {
    console.error('Error liking post:', error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};
