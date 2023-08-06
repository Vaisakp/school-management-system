const db = require("./database");

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

module.exports = createUserTable;
