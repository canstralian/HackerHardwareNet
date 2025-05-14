-- Migration: Create Challenge-related tables

-- Security Challenges table
CREATE TABLE IF NOT EXISTS "security_challenges" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "scenario" TEXT NOT NULL,
  "difficulty" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "author_id" INTEGER NOT NULL REFERENCES "users"("id"),
  "image_url" TEXT,
  "hardware_ids" JSONB,
  "tools" JSONB,
  "points" INTEGER DEFAULT 10,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  "tags" JSONB NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "is_active" BOOLEAN DEFAULT TRUE,
  "views" INTEGER DEFAULT 0,
  "likes" INTEGER DEFAULT 0,
  "attempts" INTEGER DEFAULT 0,
  "solutions" INTEGER DEFAULT 0
);

-- Challenge Solutions table
CREATE TABLE IF NOT EXISTS "challenge_solutions" (
  "id" SERIAL PRIMARY KEY,
  "challenge_id" INTEGER NOT NULL REFERENCES "security_challenges"("id"),
  "author_id" INTEGER NOT NULL REFERENCES "users"("id"),
  "content" TEXT NOT NULL,
  "approach" TEXT NOT NULL,
  "tools_used" JSONB NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  "is_approved" BOOLEAN DEFAULT FALSE,
  "votes" INTEGER DEFAULT 0,
  "code_snippets" JSONB,
  "attachments" JSONB
);

-- Challenge Comments table
CREATE TABLE IF NOT EXISTS "challenge_comments" (
  "id" SERIAL PRIMARY KEY,
  "challenge_id" INTEGER NOT NULL REFERENCES "security_challenges"("id"),
  "author_id" INTEGER NOT NULL REFERENCES "users"("id"),
  "content" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);

-- User Challenge Progress table
CREATE TABLE IF NOT EXISTS "user_challenge_progress" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id"),
  "challenge_id" INTEGER NOT NULL REFERENCES "security_challenges"("id"),
  "status" TEXT NOT NULL DEFAULT 'started',
  "started_at" TIMESTAMP DEFAULT NOW(),
  "last_attempted_at" TIMESTAMP DEFAULT NOW(),
  "completed_at" TIMESTAMP,
  "attempts" INTEGER DEFAULT 1,
  "progress" INTEGER DEFAULT 0,
  "notes" TEXT,
  "bookmarked" BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_security_challenges_author" ON "security_challenges"("author_id");
CREATE INDEX IF NOT EXISTS "idx_security_challenges_category" ON "security_challenges"("category");
CREATE INDEX IF NOT EXISTS "idx_security_challenges_difficulty" ON "security_challenges"("difficulty");
CREATE INDEX IF NOT EXISTS "idx_challenge_solutions_challenge" ON "challenge_solutions"("challenge_id");
CREATE INDEX IF NOT EXISTS "idx_challenge_solutions_author" ON "challenge_solutions"("author_id");
CREATE INDEX IF NOT EXISTS "idx_challenge_comments_challenge" ON "challenge_comments"("challenge_id");
CREATE INDEX IF NOT EXISTS "idx_user_challenge_progress_user" ON "user_challenge_progress"("user_id");
CREATE INDEX IF NOT EXISTS "idx_user_challenge_progress_challenge" ON "user_challenge_progress"("challenge_id");
CREATE UNIQUE INDEX IF NOT EXISTS "idx_user_challenge_progress_unique" ON "user_challenge_progress"("user_id", "challenge_id");