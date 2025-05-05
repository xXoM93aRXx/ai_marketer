require('dotenv').config({path:'.env.local'})

module.exports = {
    schema: './db/schema.js',
    out: './drizzle',
    driver: 'pg',                 // ✅ back to "pg"
    dialect: 'postgresql',        // ✅ required
    dbCredentials: {
      connectionString: process.env.DATABASE_URL,
    },
  };
  

