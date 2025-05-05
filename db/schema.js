// db/schema.js
const { pgTable, text, boolean, timestamp, uuid } = require('drizzle-orm/pg-core');

const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password'),       
  apiKey: text('api_key').notNull().unique(),
  verificationToken: text('verification_token'),
  passwordSetupToken: text("password_setup_token"), 
  isActive: boolean('is_active').default(false),
  role: text('role').default('user'),
  createdAt: timestamp('created_at').defaultNow(),
});

module.exports = { users };
