# To-Do-List-Application-Backend

# 📝 To-Do List Application

A simple full-stack To-Do List web application built with **Angular** (v15+) and **Node.js (Express)** using **mock data** for backend and **Local Storage** for persistence.

---

## 📌 Features

- ✅ List of all to-do lists with summary
- ✅ View all tasks under each list
- ✅ Add new to-do lists
- ✅ Add tasks under a list
- ✅ Mark tasks as completed
- ✅ Store data in Local Storage (Frontend)
- ✅ REST API structure using mock data
- ✅ Clean modular architecture
- ✅ Unit Testing setup (Jest)

---

## 🔧 Tech Stack

| Layer      | Tech         |
|------------|--------------|
| Frontend   | Angular 15+  |
| Backend    | Node.js, Express |
| State Mgmt | BehaviorSubject |
| Data       | Mock JSON    |
| Storage    | LocalStorage |
| Testing    | Jest         |

---

## 📁 Project Structure

### Backend (Node.js + Express)

backend/ ├── controllers/ │ └── todo.controller.js ├── routes/ │ └── todo.routes.js ├── mock/ │ └── todos.json ├── config/ │ └── db.js (fake connection) ├── app.js └── server.js

### Frontend (Angular)
frontend/ ├── src/ │ ├── app/ │ │ ├── modules/ │ │ ├── components/ │ │ ├── services/ │ │ ├── models/ │ │ └── app.module.ts │ └── environments/ ├── angular.json └── package.json

---

## 🚀 Setup Instructions

### Backend (Mock API)

1. Navigate to backend folder:
   ```bash
   cd backend

2. Install dependencies:

npm install

Start the mock app server:
node app.js

Server will run at:
http://localhost:3000

Frontend (Angular)
Navigate to frontend folder:

cd frontend
Install Angular packages:

npm install
Start Angular app:

ng serve
App will run at: http://localhost:4200

🧪 Running Tests
ng test

