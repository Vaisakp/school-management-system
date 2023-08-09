const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 3000;
const secretKey = "your_secret_key"; // Replace 'your_secret_key' with a secret key of your choice

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

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
      subject1 TEXT NOT NULL,
      subject2 TEXT NOT NULL,
      subject3 TEXT NOT NULL,
      stage TEXT NOT NULL,
      year TEXT NOT NULL,
      classname TEXT NOT NULL,
      image Text
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

const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
  };

  const options = {
    expiresIn: "1h", // Token will expire in 1 hour
  };

  return jwt.sign(payload, secretKey, options);
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

  // Loop through each stage and year combination and insert at least one entry in the table
  stages.forEach((stage) => {
    const years = stage === "Primary" ? primaryYears : secondaryYears;

    years.forEach((year) => {
      const randomIndex = Math.floor(Math.random() * classNames.length);
      for (let i = 0; i <= randomIndex; i++) {
        const classname = classNames[i];
        const query = `
          INSERT INTO classdetails (classname, stage, year)
          VALUES (?, ?, ?);
        `;
        insertQueries.push({ query, params: [classname, stage, year] });
      }
    });
  });

  // Generate additional random data to fill up to 20 entries in total
  for (let i = insertQueries.length; i < 20; i++) {
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

createUserTable();
createStudentTable();
createClassDetailsTable();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer();

app.post("/login", upload.none(), (req, res) => {
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

    delete user.password;
    const token = generateToken(user);
    res.json({ data: user, token, success: true });
  });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token after "Bearer"

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authorization header not found.", success: false });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Invalid or expired token. Please login again", success: false });
    }

    req.user = user;
    next();
  });
};

app.post("/students", authenticateToken,(req, res) => {
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
    image
  } = req.body;
  const requiredFields = [
    "name",
    "age",
    "address",
    "subject1",
    "subject2",
    "subject3",
    "stage",
    "year",
    "classname",
  ];

  // Check if all required fields are present
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `All fields except the image are required. Missing fields: ${missingFields.join(
        ", "
      )}`,
      success: false,
    });
  }

  let query;
  let parameters;

  if (image) {
    query = `
      INSERT INTO students (name, age, address, subject1, subject2, subject3, stage, year, classname, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    parameters = [
      name,
      age,
      address,
      subject1,
      subject2,
      subject3,
      stage,
      year,
      classname,
      image,
    ];
  } else {
    query = `
      INSERT INTO students (name, age, address, subject1, subject2, subject3, stage, year, classname)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    parameters = [
      name,
      age,
      address,
      subject1,
      subject2,
      subject3,
      stage,
      year,
      classname,
    ];
  }

  db.run(query, parameters, function (err) {
    if (err) {
      console.error("Error inserting student data:", err.message);
      return res
        .status(500)
        .json({ error: "Internal server error.", success: false });
    }

    const id = this.lastID;
    res.json({
      message: "Student data inserted successfully.",
      id,
      success: true,
    });
  });
});

app.get("/students", authenticateToken, (req, res) => {
  const { year, stage, classname } = req.query;

  let query = `SELECT * FROM students`;

  // Check if any of the query parameters (year, stage, classname) are provided
  if (year || stage || classname) {
    query += ` WHERE`;
    const conditions = [];

    if (year) {
      conditions.push(` year = '${year}'`);
    }
    if (stage) {
      conditions.push(` stage = '${stage}'`);
    }
    if (classname) {
      conditions.push(` classname = '${classname}'`);
    }

    query += conditions.join(" AND");
  }

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

app.get("/students/:id", authenticateToken, (req, res) => {
  const studentId = req.params.id;
  const query = `SELECT * FROM students WHERE id = ?`;

  db.get(query, [studentId], (err, student) => {
    if (err) {
      console.error("Error retrieving student data:", err.message);
      return res.status(500).json({ error: "Internal server error.", success: false });
    }

    if (!student) {
      return res.status(404).json({ error: "Student not found.", success: false });
    }

    res.json({ data: student, success: true });
  });
});

app.put("/students/", authenticateToken, upload.single("image"), (req, res) => {
  const studentId = req.body.id;
  const studentData = req.body;

  const requiredFields = [
    "name",
    "age",
    "address",
    "subject1",
    "subject2",
    "subject3",
    "stage",
    "year",
    "classname",
  ];

  // Check if all required fields are present
  const missingFields = requiredFields.filter((field) => !studentData[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `All fields except the image are required. Missing fields: ${missingFields.join(
        ", "
      )}`,
      success: false,
    });
  }

  const keys = Object.keys(studentData);
  const values = Object.values(studentData);

  const placeholders = keys.map((key) => `${key} = ?`).join(", ");

  const query = `
    UPDATE students
    SET ${placeholders}
    WHERE id = ?
  `;

  db.run(query, [...values, studentId], function (err) {
    if (err) {
      console.error("Error updating student data:", err.message);
      return res
        .status(500)
        .json({ error: "Internal server error.", success: false });
    }

    res.json({
      message: "Student data updated successfully.",
      success: true,
    });
  });
});

// Delete student data by ID
app.delete("/students/:id", authenticateToken, (req, res) => {
  const studentId = req.params.id; // Get studentId from URL parameter
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

app.get("/classnames", authenticateToken, (req, res) => {
  const { stage, year } = req.query;

  if (!stage || !year) {
    return res.status(400).json({
      error: 'Both "stage" and "year" parameters are required.',
      success: false,
    });
  }

  const query = `
    SELECT DISTINCT classname
    FROM classdetails
    WHERE stage = ? AND year = ?
    ORDER BY classname ASC
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

app.use((req, res, next) => {
  res.status(404).json({ error: "Not found.", success: false });
});

app.use((err, req, res, next) => {
  console.error("Internal server error:", err);
  res.status(500).json({ error: "Internal server error.", success: false });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
