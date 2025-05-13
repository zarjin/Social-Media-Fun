# Social Media Fun - Backend

The backend API for the Social Media Fun application built with Node.js, Express, and MongoDB.

## 🌟 Features

- **User Management**
  - User registration and authentication
  - JWT-based authentication with HTTP-only cookies
  - Profile management with image uploads
  - Follow/unfollow functionality

- **Post Management**
  - Create, read, update, and delete posts
  - Image uploads for posts using Cloudinary
  - Like/unlike posts
  - Comment on posts

- **Security**
  - Password hashing with bcrypt
  - JWT token authentication
  - Protected routes with middleware
  - Input validation

- **File Uploads**
  - Image upload for user profiles and posts
  - Integration with Cloudinary for cloud storage
  - Proper file validation and handling

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload middleware
- **Cloudinary** - Cloud storage for images
- **Cors** - Cross-Origin Resource Sharing
- **Cookie-Parser** - HTTP request cookie parsing

## 📂 Project Structure

```
backend/
├── config/                # Configuration files
│   ├── cloudinary.config.js # Cloudinary configuration
│   └── db.config.js       # Database connection
├── controllers/           # Request handlers
│   ├── post.controller.js # Post-related controllers
│   └── user.controller.js # User-related controllers
├── middlewares/           # Custom middlewares
│   ├── authentication.middleware.js # Auth middleware
│   └── upload.middleware.js # File upload middleware
├── models/                # Database models
│   ├── post.models.js     # Post schema
│   └── user.models.js     # User schema
├── routes/                # API routes
│   ├── post.routes.js     # Post routes
│   └── user.routes.js     # User routes
├── .env                   # Environment variables (not in repo)
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies
├── server.js              # Application entry point
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the root directory with the following variables:
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

3. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

4. **Access the API**
   - The API will be available at http://localhost:5000

## 📡 API Endpoints

### Authentication

- **POST /api/user/register**
  - Register a new user
  - Body: `{ firstName, lastName, email, password }`
  - Returns: JWT token in HTTP-only cookie

- **POST /api/user/login**
  - Login a user
  - Body: `{ email, password }`
  - Returns: JWT token in HTTP-only cookie

- **GET /api/user/logout**
  - Logout a user
  - Clears the JWT cookie

### User Management

- **GET /api/user/getUser**
  - Get current user data
  - Requires: Authentication
  - Returns: User object

- **GET /api/user/getAllUser**
  - Get all users
  - Returns: Array of user objects

- **PUT /api/user/update**
  - Update user profile
  - Requires: Authentication
  - Body: FormData with `bio`, `workAt`, `address`, `relationshipStatus`, `profileImage`, `coverImage`
  - Returns: Updated user object

- **DELETE /api/user/delete**
  - Delete user account
  - Requires: Authentication

- **POST /api/user/following/:followerId**
  - Follow/unfollow a user
  - Requires: Authentication
  - Returns: Success message

- **POST /api/user/likePost/:postId**
  - Like a post (user context)
  - Requires: Authentication
  - Returns: Updated liked posts array

### Post Management

- **GET /api/post/all**
  - Get all posts
  - Requires: Authentication
  - Returns: Array of post objects

- **POST /api/post/create**
  - Create a new post
  - Requires: Authentication
  - Body: FormData with `title`, `postImage`
  - Returns: Created post object

- **PUT /api/post/update/:id**
  - Update a post
  - Requires: Authentication
  - Body: FormData with `title`, optional `postImage`
  - Returns: Updated post object

- **DELETE /api/post/delete/:id**
  - Delete a post
  - Requires: Authentication
  - Returns: Success message

- **POST /api/post/comment/:postId**
  - Add a comment to a post
  - Requires: Authentication
  - Body: `{ text }`
  - Returns: Updated comment object

- **PUT /api/post/like/:id**
  - Like/unlike a post
  - Requires: Authentication
  - Returns: Success message

## 🔒 Authentication Flow

1. **Registration**
   - User submits registration form
   - Password is hashed using bcrypt
   - User is created in the database
   - JWT token is generated and set as HTTP-only cookie

2. **Login**
   - User submits login form
   - Password is verified against hashed password
   - JWT token is generated and set as HTTP-only cookie

3. **Protected Routes**
   - JWT token is verified using middleware
   - User ID is extracted from token and added to request object
   - If token is invalid or missing, request is rejected

4. **Logout**
   - JWT cookie is cleared

## 📦 Models

### User Model

```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profileImage: String,
  coverImage: String,
  bio: String,
  workAt: String,
  address: String,
  relationshipStatus: String,
  yourPost: [ObjectId],
  yourLikePost: [ObjectId],
  following: [ObjectId],
  followers: [ObjectId]
}
```

### Post Model

```javascript
{
  title: String,
  postImage: String,
  likes: [String],
  comments: [{
    user: ObjectId,
    text: String,
    createdAt: Date
  }],
  createPostBy: ObjectId
}
```

## 🧪 Error Handling

The API includes comprehensive error handling:

- Validation errors for invalid input
- Authentication errors for unauthorized access
- Database errors for failed operations
- File upload errors for invalid files

## 🔄 Middleware

- **Authentication Middleware**: Verifies JWT tokens and adds user to request
- **Upload Middleware**: Handles file uploads to Cloudinary
