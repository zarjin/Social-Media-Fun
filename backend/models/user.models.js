import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 3, maxlength: 15 },
    lastName: { type: String, required: true, minlength: 3, maxlength: 15 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8, maxlength: 16 },
    profileImage: { type: String },
    coverImage: { type: String },
    bio: { type: String, minlength: 25, maxlength: 100 },
    workAt: { type: String },
    address: { type: String },
    relationshipStatus: { type: String },
    yourPost: [{ postId: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    following: [{ userId: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    follower: [{ userId: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);
export default userModel;
