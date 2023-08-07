const db = require("./database");

const createStudentTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      address TEXT NOT NULL,
      subject1 INTEGER NOT NULL,
      subject2 INTEGER NOT NULL,
      subject3 INTEGER NOT NULL,
      stage TEXT NOT NULL,
      year TEXT NOT NULL,
      classname TEXT NOT NULL
    );`;

  db.run(query, (err) => {
    if (err) {
      console.error('Error creating the "students" table:', err.message);
    } else {
      console.log('Table "students" created successfully.');
    }
  });
};

const createClassDetailsTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS classdetails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      classname TEXT NOT NULL,
      stage TEXT NOT NULL,
      year INTEGER NOT NULL
    );`;

  db.run(query, (err) => {
    if (err) {
      console.error('Error creating the "classdetails" table:', err.message);
    } else {
      console.log('Table "classdetails" created successfully.');
    }
  });
};

const insertStudentsData = (req, res) => {
  const {
    name,
    age,
    address,
    subject1,
    subject2,
    subject3,
    stage,
    year,
    classname,
  } = req.body;

  if (
    !name ||
    !age ||
    !address ||
    !subject1 ||
    !subject2 ||
    !subject3 ||
    !stage ||
    !year ||
    !classname
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required.", success: false });
  }

  const query = `
    INSERT INTO students (name, age, address, subject1, subject2, subject3, stage, year, classname)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [name, age, address, subject1, subject2, subject3, stage, year, classname],
    function (err) {
      if (err) {
        console.error("Error inserting student data:", err.message);
        return res
          .status(500)
          .json({ error: "Internal server error.", success: false });
      }

      const studentId = this.lastID;
      res.json({
        message: "Student data inserted successfully.",
        studentId,
        success: true,
      });
    }
  );
};

const getAllStudents = (req, res) => {
  const query = `SELECT * FROM students`;

  db.all(query, (err, students) => {
    if (err) {
      console.error("Error retrieving student data:", err.message);
      return res
        .status(500)
        .json({ error: "Internal server error.", success: false });
    }
    res.json({ data: students, success: true });
  });
};

const updateStudent = (req, res) => {
  const studentId = req.params.id;
  const studentData = req.body;

  // Check if any fields are provided in the request body
  if (Object.keys(studentData).length === 0) {
    return res
      .status(400)
      .json({ error: "No fields to update.", success: false });
  }

  const keys = Object.keys(studentData);
  const values = Object.values(studentData);

  // Generate placeholders for dynamic SQL query
  const placeholders = keys.map((key) => `${key} = ?`).join(", ");

  const query = `
    UPDATE students
    SET ${placeholders}
    WHERE id = ?
  `;

  // Execute the dynamic SQL query
  db.run(query, [...values, studentId], function (err) {
    if (err) {
      console.error("Error updating student data:", err.message);
      return res
        .status(500)
        .json({ error: "Internal server error.", success: false });
    }

    res.json({ message: "Student data updated successfully.", success: true });
  });
};

const deleteStudent = (req, res) => {
  const studentId = req.params.id;

  const query = `DELETE FROM students WHERE id = ?`;

  db.run(query, [studentId], function (err) {
    if (err) {
      console.error("Error deleting student data:", err.message);
      return res
        .status(500)
        .json({ error: "Internal server error.", success: false });
    }

    res.json({ message: "Student data deleted successfully.", success: true });
  });
};

const getClassNames = (req, res) => {
  const { stage, year } = req.query;

  if (!stage || !year) {
    return res.status(400).json({
      error: 'Both "stage" and "year" parameters are required.',
      success: false,
    });
  }

  // Query the database to get classnames based on stage and year
  const query = `
    SELECT DISTINCT classname
    FROM classdetails
    WHERE stage = ? AND year = ?
  `;

  db.all(query, [stage, year], (err, rows) => {
    if (err) {
      console.error("Error retrieving classnames:", err.message);
      return res
        .status(500)
        .json({ error: "Internal server error.", success: false });
    }

    const classnames = rows.map((row) => row.classname);
    res.json({ data: classnames, success: true });
  });
};

module.exports = {
  createStudentTable,
  createClassDetailsTable,
  insertStudentsData,
  getAllStudents,
  updateStudent,
  deleteStudent,
  getClassNames,
};
