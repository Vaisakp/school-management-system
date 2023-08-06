const express = require("express");
const app = express();
const port = 3000;

const createUserTable = require("./userController");
const studentController = require("./studentController");

// Create the "users" table if it doesn't exist and insert default user
createUserTable();
studentController.createStudentTable();
studentController.createClassDetailsTable();
app.use(express.json());

// API endpoints for students
app.post("/students", studentController.insertStudentsData);
app.get("/students", studentController.getAllStudents);
app.put("/students/:id", studentController.updateStudent);
app.delete("/students/:id", studentController.deleteStudent);

// API endpoint to get classnames based on stage and year values
app.get("/classnames", studentController.getClassNames);

// Error handling middleware for routes that don't exist
app.use((req, res, next) => {
  res.status(404).json({ error: "Not found.", success: false });
});

// Error handling middleware for all other errors
app.use((err, req, res, next) => {
  console.error("Internal server error:", err);
  res.status(500).json({ error: "Internal server error.", success: false });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
