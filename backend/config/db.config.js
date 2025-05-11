import mongoose from 'mongoose';

const dbConntect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(`MongoDB:${error}`);
  }
};

export default dbConntect;
