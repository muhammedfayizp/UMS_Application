# UMS – User Management System

A simple **User Management System (UMS)** built to manage users, authentication, and user-related operations through a clean and easy-to-use application.

## Features

* User registration and login
* Secure authentication
* User profile management
* Admin/user role management
* CRUD
* Protected routes
* Form validation
* Responsive user interface

## Tech Stack

### Frontend

* React.js
* Redux / Redux Toolkit
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

## Project Structure

```text
UMS/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── routes/
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── server.js
│   └── package.json
│
└── README.md
```

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd UMS
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Install Frontend Dependencies

```bash
cd ../client
npm install
```

## Environment Variables

Create a `.env` file inside the `server` directory.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

If the frontend requires an environment variable, create a `.env` file inside the `client` directory:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Running the Application

### Start Backend

```bash
cd server
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Start Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## Authentication

The application uses JWT-based authentication to protect user-related resources.

Passwords are securely hashed before being stored in the database.

## User Roles

### Admin

* Manage users
* View user information
* Update user details
* Delete users
* Manage user roles

### User

* Register and login
* View profile
* Update personal information

## API

The backend provides REST APIs for:

* Authentication
* User management
* Profile management
* Role-based access
