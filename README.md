# 🩺 HealthTrack - Medical Record Management System

HealthTrack is a full-stack role-based web application for managing patients, medical records, and appointments in a clinic setting. The system supports two types of users: **Doctors** and **Secretaries**, each with distinct permissions and access levels.

---

## 🚀 Features

### ✅ User Roles

- **Doctor**
  - Full access to medical records (Create, Read, Update, Delete)
  - View and edit patient information
  - View appointments
- **Secretary**
  - Full control over patient data (CRUD)
  - Full control over appointments (CRUD)
  - View-only access to medical records

### ✅ Authentication

- Custom login and registration system
- Role assigned during registration
- Login redirects user based on role (Doctor → Dashboard, Secretary → Appointments)

### ✅ Dashboard

- Doctor-only access
- Displays:
  - Total number of patients
  - Total medical records
  - Total appointments

### ✅ Patient Management

- Doctors can view and edit patient info
- Secretaries can create, edit, delete, and view all patients

### ✅ Medical Record Management

- Doctors can create, edit, delete, and view records
- Records include:
  - Diagnosis
  - Treatment
  - Notes
  - Record date
- Secretaries can view records only

### ✅ Appointment Scheduling

- Secretaries manage appointments
- Doctors can view scheduled appointments (includes patient name, complaint, and date)

### ✅ Home Page

- Welcomes the user with the app logo
- Includes motivational quote of the day (from ZenQuotes API)
- Login and Register buttons
- Navigation to Login, Register, or return to Home

---

## 🛠 Tech Stack

| Frontend              | Backend              | Database     |
|-----------------------|----------------------|--------------|
| React + Vite + Bootstrap | Node.js + Express.js   | MSSQL        |
| React Router          | JWT Authentication   | UUIDs for PK |

---

## 📂 Folder Structure
```
HealthTrack-Client/
├── src/
│ ├── components/   # Reusable UI like Sidebar, Loading
│ ├── pages/        # Appointments, Patients, Records, Dashboard
│ ├── App.jsx       # Main app routes
│ └── main.jsx      # Entry point
├── public/
└── vite.config.js
```
---

## 🛡 Role-Based Access (Frontend)

| Page         | Doctor           | Secretary       |
|--------------|------------------|-----------------|
| Dashboard    | ✅ full access    | ❌ no access     |
| Patients     | ✅ view/edit      | ✅ full CRUD     |
| Records      | ✅ full CRUD      | ✅ view-only     |
| Appointments | ✅ view-only      | ✅ full CRUD     |

---

## 💬 Quote of the Day API

- Used: `https://zenquotes.io/api/today`
- Fetches a new motivational quote each day on the home page

---

## 📦 Deployment

- Frontend: Vite build deployed via [Railway](https://railway.app)
- Backend: Node.js API with MSSQL connected on Railway
- Ensure `vite.config.js` and all file casing are correct (Linux is case-sensitive)

---

## ✅ Getting Started

### 🔧 Run Frontend

```bash
cd HealthTrack-Client
npm install
npm run dev
```


---
### 👨‍💻 Developed By

Khaled Hamed 

Fall 2024–2025 | Special Topics in Computer Science