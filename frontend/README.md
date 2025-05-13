# Social Media Fun - Frontend

The frontend for the Social Media Fun application built with React, Tailwind CSS, and Vite.

## 🌟 Features

- **Modern UI/UX**

  - Clean and intuitive interface
  - Responsive design for all devices
  - Dark theme with accent colors

- **Authentication**

  - User registration with form validation
  - Login with secure cookie-based authentication
  - Protected routes for authenticated users

- **Social Feed**

  - View posts from all users
  - Create new posts with image uploads
  - Like and comment on posts
  - Real-time feedback on interactions

- **User Profiles**

  - View and edit profile information
  - Upload profile and cover images
  - Display user stats (posts, followers, following)

- **Social Connections**
  - Follow/unfollow other users
  - View followers and following
  - Discover new users to connect with

## 🛠️ Tech Stack

- **React** - UI library
- **React Router DOM** - Navigation and routing
- **React Hook Form** - Form validation and handling
- **Axios** - API requests
- **Tailwind CSS** - Utility-first CSS framework
- **React Toastify** - Toast notifications
- **React Icons** - Icon library
- **Vite** - Build tool and development server

## 📂 Project Structure

```
frontend/
├── public/                # Static files
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.jsx     # Navigation bar
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── contexts/          # Context providers
│   │   └── AuthContext.jsx # Authentication context
│   ├── pages/             # Page components
│   │   ├── Feeds.jsx      # Main feed page
│   │   ├── Friends.jsx    # Friends/following page
│   │   ├── Login.jsx      # Login page
│   │   ├── Profile.jsx    # User profile page
│   │   └── Register.jsx   # Registration page
│   ├── services/          # API services
│   │   └── api.js         # API client and endpoints
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── .gitignore             # Git ignore file
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Access the application**
   - Open your browser and navigate to http://localhost:5173

### Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 📱 Pages and Components

### Pages

- **Login** - User authentication
- **Register** - New user registration
- **Feeds** - Main content feed with posts
- **Profile** - User profile management
- **Friends** - User connections and discovery

### Key Components

- **Navbar** - Navigation and user status
- **ProtectedRoute** - Route protection for authenticated users
- **AuthContext** - Global authentication state management
- **API Service** - Centralized API communication

## 🔄 State Management

The application uses React Context API for global state management:

- **AuthContext** - Manages user authentication state
  - Current user information
  - Login/logout functionality
  - Authentication status

## 📡 API Integration

The frontend communicates with the backend API using Axios:

- **api.js** - Centralized API service
  - User API endpoints (authentication, profile, social)
  - Post API endpoints (create, read, update, delete)
  - Proper error handling and response processing

## 🎨 Styling

The application uses Tailwind CSS for styling:

- Utility-first approach
- Custom color scheme
- Responsive design
- Dark theme
