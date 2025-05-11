import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import userModel from '../models/user.models.js';

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(500).json({ message: 'User Allready Existing User' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    if (!hashPassword) {
      res.status(500).json({ message: 'Password is Not Hashed' });
    }

    const user = await userModel({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    await user.save();

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    res.status(200).json({ message: 'User Regiser Succsesfully' });
  } catch (error) {
    console.log(`Register ${error}`);

    res.status(500).json({ message: 'User Regiser Unuccsesfully' });
  }
};
