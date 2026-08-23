# 🚀 Lexbridge - Real-Time Mentorship & Video Consultation Platform

<p align="center">
  <b>A full-stack production-grade MERN application featuring WebRTC video conferencing, real-time chat, and automated session lifecycle tracking.</b>
</p>

---

## 🎥 Project Demo
> *[Insert Video / GIF Demo Here]*  
> *(Watch the core workflow of booking, real-time video streaming, and automated status handling)*

---

## ✨ Key Features

* **Role-Based Authentication:** Secure JWT-based authentication supporting distinct user flows for **Users (Mentees)** and **Mentors**.
* **Real-Time Video Conferencing:** Built using **WebRTC** and **Socket.io** for peer-to-peer audio/video calling and live room management.
* **Persistent Real-Time Chat:** Integrated Socket.io messaging with a MongoDB backend to ensure chat history is securely saved and retrieved across refreshes.
* **Automated Session Lifecycle & Attendance Tracking:** A background logic system that dynamically handles and updates booking statuses (`confirmed`, `completed`, `mentor_absent`, `student_absent`, `missed`) based on scheduled timestamps and join flags.
* **Responsive UI:** Clean, modern, and intuitive user interface built for seamless scheduling and consultation.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Socket.io-client, WebRTC API
* **Backend:** Node.js, Express.js, Socket.io
* **Database:** MongoDB, Mongoose
* **Authentication:** JSON Web Tokens (JWT), Bcrypt.js

---

## ⚙️ Getting Started (Local Setup)

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/lexbridge.git](https://github.com/your-username/lexbridge.git)
cd lexbridge