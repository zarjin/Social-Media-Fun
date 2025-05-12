import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.config.js';

const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Social Media User',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const postStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Social Media Post',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

export const userImage = multer({ storage: userStorage });

export const postImage = multer({ storage: postStorage });
