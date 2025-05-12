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
  subscriptionStart: timestamp('subscription_start', { mode: 'date' }).defaultNow(),
  subscriptionEnd: timestamp('subscription_end', { mode: 'date', nullable: true }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),  // No .onUpdateNow()
});

module.exports = { users };
