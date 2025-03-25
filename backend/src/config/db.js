const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      email VARCHAR(191) NOT NULL UNIQUE,
      active BOOLEAN DEFAULT FALSE,
      code VARCHAR(191),
      password VARCHAR(191) NOT NULL,
      reset_token VARCHAR(191) DEFAULT NULL,
      reset_token_expiry BIGINT DEFAULT NULL
    )
  `;
  await db.query(query);
  console.log("Users table created or already exists");
};

const initDb = async () => {
  try {
    await db.getConnection();
    await createUsersTable();
    console.log("Connected to MySQL Database");
  } catch (err) {
    console.error("Database connection failed: " + err.message);
    process.exit(1);
  }
};

(async () => {
  await initDb();
})();

module.exports = db;