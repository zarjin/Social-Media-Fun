# Social Media Fun

A full-stack social media application with modern UI and comprehensive features including user authentication, post creation with image uploads, social interactions, and profile management.

![Social Media Fun](https://via.placeholder.com/1200x600?text=Social+Media+Fun)

## 🌟 Features

- **User Authentication**
  - Register, login, and logout functionality
  - JWT-based authentication with secure HTTP-only cookies
  - Protected routes for authenticated users

- **Post Management**
  - Create posts with image uploads (using Cloudinary)
  - Like/unlike posts
  - Comment on posts
  - View all posts in a feed

- **User Profiles**
  - Customizable user profiles with profile and cover images
  - Bio, work, address, and relationship status
  - View and edit profile information

- **Social Interactions**
  - Follow/unfollow other users
  - View followers and following lists
  - Discover new users to follow

- **Responsive Design**
  - Mobile-first approach
  - Adapts to all screen sizes
  - Modern and intuitive UI

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation and routing
- **React Hook Form** - Form validation
- **Axios** - API requests
- **Tailwind CSS** - Styling
- **React Toastify** - Notifications
- **React Icons** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - Image storage

## 📂 Project Structure

```
Social-Media-Fun/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── ...
│   └── ...
├── backend/                # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Custom middlewares
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── ...
└── ...
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Social-Media-Fun.git
   cd Social-Media-Fun
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=1h
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ALLOWED_ORIGIN=http://localhost:5173
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📸 Screenshots

![Login Page](https://via.placeholder.com/400x300?text=Login+Page)
![Feed Page](https://via.placeholder.com/400x300?text=Feed+Page)
![Profile Page](https://via.placeholder.com/400x300?text=Profile+Page)
![Friends Page](https://via.placeholder.com/400x300?text=Friends+Page)

## 🔒 API Endpoints

### Authentication
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login a user
- `GET /api/user/logout` - Logout a user

### User Management
- `GET /api/user/getUser` - Get current user data
- `GET /api/user/getAllUser` - Get all users
- `PUT /api/user/update` - Update user profile
- `DELETE /api/user/delete` - Delete user account
- `POST /api/user/following/:followerId` - Follow/unfollow user
- `POST /api/user/likePost/:postId` - Like a post (user context)

### Post Management
- `GET /api/post/all` - Get all posts
- `POST /api/post/create` - Create a new post
- `PUT /api/post/update/:id` - Update a post
- `DELETE /api/post/delete/:id` - Delete a post
- `POST /api/post/comment/:postId` - Add a comment to a post
- `PUT /api/post/like/:id` - Like/unlike a post

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cloudinary](https://cloudinary.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
