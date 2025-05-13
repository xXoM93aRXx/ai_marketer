// db/schema.js
const { pgTable, text, boolean, timestamp, uuid } = require('drizzle-orm/pg-core');

const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  password: text('password'),
  apiKey: text('api_key').notNull().unique(),
  verificationToken: text('verification_token'),
  passwordSetupToken: text("password_setup_token"),
  isActive: boolean('is_active').default(false),
  role: text('role').default('user'),

  // Subscription fields
  subscriptionStart: timestamp('subscription_start', { mode: 'date' }).defaultNow(),
  subscriptionEnd: timestamp('subscription_end', { mode: 'date', nullable: true }),

  // User preferences
  targetAudience: text('target_audience').default('General'),  // Target Audience
  goal: text('goal').default('Inform'),                      // Goal/Objectives
  tone: text('tone').default('Neutral'),                     // Tone of Voice
  ageGroup: text('age_group').default('All'),                 // Age Group

  // Timestamps
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }),  // Updated timestamp without defaultNow
});

module.exports = { users };
