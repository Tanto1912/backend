require("dotenv").config();
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT, // default PostgreSQL port is 5432
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  max: 10, // maximum number of connections in the pool
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL database connected successfully!");
    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL connection failed:", error.message);
    console.log(
      "🔍 Trying to connect to DB at:",
      process.env.HOST,
      process.env.PORT
    );
  }
}

testConnection(); // Test saat file ini di-load

module.exports = pool;
