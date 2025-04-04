# 📝 To-Do List Application

This is a full-stack **To-Do List** application built with:

- **Backend**: Node.js + Express (Memory-based store, no DB)
- **Frontend**: Angular (Standalone Components with BehaviorSubject)
- Data is persisted using **local storage** and also **synced to backend**
- ✅ Fully **mobile responsive**
- ✅ **Unit tests** for both backend and frontend

---

## 📁 Folder Structure

```
To-Do-List-Application/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── routes/
│   ├── tests/
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── features/todo/
│   │       │   ├── components/todo-list/
│   │       │   ├── models/
│   │       │   └── services/
│   ├── angular.json
│   └── package.json
```

---

## 🚀 Backend Setup

### ✅ Tech Stack

- Node.js
- Express.js
- In-memory store (no DB used)
- Jest for unit testing

### ✅ Setup Instructions

```bash
cd Backend
npm install
node app.js
```

📍 Runs at: `http://localhost:3000`

### ✅ Available Endpoints

| Method | Endpoint                        | Description                          |
|--------|----------------------------------|--------------------------------------|
| GET    | `/api/todos`                    | Fetch all to-do lists                |
| POST   | `/api/todos`                    | Create a new to-do list              |
| POST   | `/api/todos/:id/tasks`          | Add a task to a specific list        |
| PUT    | `/api/todos/:id/tasks/:tid`     | Toggle a task's completion status    |

### ✅ Run Backend Tests

```bash
npm test
```

---

## 🌐 Frontend Setup

### ✅ Tech Stack

- Angular v15+
- Standalone Angular Components
- RxJS `BehaviorSubject` for state management
- Bootstrap for UI
- Angular Testing Framework for unit tests

### ✅ Setup Instructions

```bash
cd frontend
npm install
ng serve
```

📍 Runs at: `http://localhost:4200`

---

## ✅ Features

- Create and manage multiple to-do lists
- Add, toggle complete/uncomplete tasks inside each list
- Tasks are displayed inline within their list (UX-friendly)
- Data syncs both to local storage & backend memory
- Fully **responsive** (mobile-friendly)

---

## ✅ Functional Highlights

- `BehaviorSubject`: Real-time state updates across components
- Standalone Angular Components
- LocalStorage: Persistent data after reload
- Backend Sync: Every list/task change also updates server memory
- Tests: Unit tests for both frontend and backend

---

## 📱 Mobile Responsive

✅ Designed to work on all screen sizes  
✅ Bootstrap grid system ensures clean layout  
✅ Touch-friendly inputs and buttons

---

## 🛠️ Future Improvements

- Persistent DB support (e.g., MongoDB/PostgreSQL)
- User login & authentication
- Task priorities & labels
- Drag & drop task reordering
- Dark mode toggle