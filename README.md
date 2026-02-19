# 🧠 Mentor-Connect  
### Full-Stack MERN Platform for Student–Mentor Interaction  
(Dockerized & Deployed on Render)

🚀 **Live Demo:**  
👉 https://student-connect-1-cszs.onrender.com/

---

## 📌 Overview

Mentor-Connect is a full-stack MERN web application that connects students with mentors/seniors for guidance, collaboration, and real-time interaction.

The platform provides secure authentication, role-based access control, mentor approval workflows, real-time chat using Socket.io, Docker-based containerization, and cloud deployment on Render.

This project demonstrates full-stack development, backend architecture, authentication security, DevOps practices, and real-time communication systems.

---

## 🚀 Features

### 👤 Authentication & Authorization
- JWT-based Registration & Login
- Role-based access (Student / Mentor / Admin)
- Protected routes
- Secure password hashing
- Admin approval system for mentors

### 🧑‍🏫 Mentor Module
- Mentor listing page
- View mentor profiles
- Mentorship request workflow
- Approval-based mentor onboarding

### 💬 Real-Time Chat
- One-to-one student–mentor messaging
- Socket.io integration
- Persistent MongoDB chat storage
- Live message updates

### 📊 Dashboard
- Dedicated Student Dashboard
- Dedicated Mentor Dashboard
- Role-based UI rendering
- Dynamic data handling

### 🛠 Admin Panel
- View pending mentor accounts
- Approve / Reject mentors
- Manage platform users

### 🐳 Docker Support
- Fully containerized MERN stack
- Dockerfile configuration
- Docker Compose orchestration
- Environment consistency across systems

### ☁️ Deployment
- Production deployed on Render
- Cloud MongoDB integration
- Environment variable configuration
- Production-ready setup

---

## 🏗 Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Context API
- Custom CSS
- Socket.io Client

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io

### DevOps & Deployment
- Docker
- Docker Compose
- Render Cloud Platform

---

## 📂 Project Structure
```
mentor-connect/
│
├── client/ # React Frontend
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── utils/
│
├── server/ # Express Backend
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── socket/
│
├── docker-compose.yml
├── Dockerfile
└── README.md

yaml
Copy code
```
---

## 🐳 Run With Docker (Recommended)

Make sure Docker is installed.

docker-compose up --build

yaml
Copy code

This will:
- Start frontend container
- Start backend container
- Connect MongoDB service

---

## 💻 Manual Setup (Without Docker)

### Backend

cd server
npm install
npm start

shell
Copy code

### Frontend

cd client
npm install
npm start

yaml
Copy code

---

## 🔐 Environment Variables

Create a `.env` file inside `server/`:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

yaml
Copy code

---

## 🌐 API Routes Overview

### Auth Routes
- POST `/api/auth/register`
- POST `/api/auth/login`

### Admin Routes
- GET `/api/admin/pending-users`
- PUT `/api/admin/approve/:id`

### Chat Routes
- POST `/api/chat/send`
- GET `/api/chat/:mentorId`

---

## 🧠 Key Learnings

- Full-stack MERN architecture design
- Role-Based Access Control (RBAC)
- Secure JWT authentication system
- Real-time communication using Socket.io
- RESTful API design principles
- MongoDB schema modeling
- Docker containerization
- Cloud deployment workflow
- Production environment configuration

---

## 🏆 Future Enhancements

- Video mentoring feature
- Mentor rating & review system
- Notification system
- Profile customization
- CI/CD pipeline integration
- Scalable microservice architecture

---

## 👨‍💻 Author

**Vansh Rana**  
B.Tech Computer Science Engineering (AI & ML)  
Chandigarh University  

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
