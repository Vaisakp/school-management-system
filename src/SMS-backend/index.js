const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Create SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

// Define the schema for the "users" table and insert the default user
const createUserTable = () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      password TEXT NOT NULL
    );`;

  const insertDefaultUserQuery = `
    INSERT INTO users (name, password)
    VALUES ('vaisak', 'password');
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating the table:", err.message);
    } else {
      console.log('Table "users" created successfully.');

      db.run(insertDefaultUserQuery, (err) => {
        if (err) {
          console.error("Error inserting default user:", err.message);
        } else {
          console.log("Default user inserted successfully.");
        }
      });
    }
  });
};

const createStudentTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      address TEXT NOT NULL,
      mark1 INTEGER NOT NULL,
      mark2 INTEGER NOT NULL,
      mark3 INTEGER NOT NULL,
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

app.get("/insert-data", (req, res) => {
  const classNames = ["Class A", "Class B", "Class C", "Class D", "Class E"];
  const stages = ["Primary", "Secondary"];
  const primaryYears = [
    "KG 1",
    "KG 2",
    "KG 3",
    "Year 1",
    "Year 2",
    "Year 3",
    "Year 4",
    "Year 5",
  ];
  const secondaryYears = ["Year 6", "Year 7", "Year 8", "Year 9"];

  // Generate and execute SQL queries to insert data
  const insertQueries = [];

  for (let i = 0; i < 20; i++) {
    const classname = classNames[Math.floor(Math.random() * classNames.length)];
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const year =
      stage === "Primary"
        ? primaryYears[Math.floor(Math.random() * primaryYears.length)]
        : secondaryYears[Math.floor(Math.random() * secondaryYears.length)];

    const query = `
      INSERT INTO classdetails (classname, stage, year)
      VALUES (?, ?, ?);
    `;

    insertQueries.push({ query, params: [classname, stage, year] });
  }

  db.serialize(() => {
    insertQueries.forEach(({ query, params }) => {
      db.run(query, params, (err) => {
        if (err) {
          console.error("Error inserting data:", err.message);
        }
      });
    });

    console.log("Data inserted successfully.");
    res.json({ message: "Data inserted successfully." });
  });
});

// Create the "users" table if it doesn't exist and insert default user
createUserTable();
createStudentTable();
createClassDetailsTable();
app.use(express.json());

// Login API endpoint
app.post("/login", express.json(), (req, res) => {
  console.log("sfsdgds");
  const { name, password } = req.body;

  if (!name || !password) {
    return res
      .status(400)
      .json({ error: "Both name and password are required.", success: false });
  }

  const query = `SELECT * FROM users WHERE name = ? AND password = ?`;
  db.get(query, [name, password], (err, user) => {
    if (err) {
      console.error("Error querying the database:", err.message);
      return res
        .status(500)
        .json({ error: "Internal server error.", success: false });
    }

    if (!user) {
      return res.status(401).json({
        error: "Authentication failed. Invalid credentials.",
        success: false,
      });
    }

    // Remove the "password" field from the user object before sending it in the response
    delete user.password;
    res.json({ data: user, success: true });
  });
});

app.post("/students", (req, res) => {
  const { name, age, address, mark1, mark2, mark3, stage, year, classname } =
    req.body;

  if (
    !name ||
    !age ||
    !address ||
    !mark1 ||
    !mark2 ||
    !mark3 ||
    !stage ||
    !year ||
    !classname
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required.", success: false });
  }

  const query = `
    INSERT INTO students (name, age, address, mark1, mark2, mark3, stage, year, classname)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [name, age, address, mark1, mark2, mark3, stage, year, classname],
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
});

// API endpoint to retrieve all student records from the "students" table
app.get("/students", (req, res) => {
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
});

// API endpoint to update a student record in the "students" table by ID
app.put("/students/:id", (req, res) => {
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
});

// API endpoint to delete a student record from the "students" table by ID
app.delete("/students/:id", (req, res) => {
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
});

// API endpoint to get classnames based on stage and year values
app.get("/classnames", (req, res) => {
  const { stage, year } = req.query;

  if (!stage || !year) {
    return res
      .status(400)
      .json({
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
});

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
