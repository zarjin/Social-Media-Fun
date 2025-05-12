import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 3, maxlength: 15 },
    lastName: { type: String, required: true, minlength: 3, maxlength: 15 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    profileImage: { type: String },
    coverImage: { type: String },
    bio: { type: String, minlength: 10, maxlength: 100 },
    workAt: { type: String },
    address: { type: String },
    relationshipStatus: {
      type: String,
      enum: ['Single', 'In a relationship', 'Married', "It's complicated"],
    },
    yourPost: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    yourLikePost: [{ type: mongoose.Types.ObjectId, ref: 'Post' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);
export default userModel;
