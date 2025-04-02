const express = require("express");
const app = express();
// const db = require('./config/db'); 
const todoRoutes = require("./routes/todo.routes");

app.use(express.json());
app.use("/api", todoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
