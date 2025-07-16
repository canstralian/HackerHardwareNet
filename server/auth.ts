import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import MemoryStore from 'memorystore';
import { Express } from 'express';
import { storage } from './storage';
import { User } from '@shared/schema';
import { pool } from './db';

// Initialize PostgreSQL session store
const PgStore = pgSession(session);
const memoryStore = MemoryStore(session);

// Configure passport to use local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find user by username
      const user = await storage.getUserByUsername(username);
      
      // If user doesn't exist
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      
      // Update last login timestamp
      await storage.updateUserLastLogin(user.id);
      
      // Return the authenticated user
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Serialize user to store in session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUser(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Configure session and authentication middleware
export function configureAuth(app: Express): void {
  // Session configuration
  app.use(
    session({
      store: process.env.NODE_ENV === 'production' && process.env.DATABASE_URL && false
        ? new PgStore({
            pool: pool,
            tableName: 'user_sessions', // Table to store sessions
          })
        : new memoryStore({
            checkPeriod: 86400000, // prune expired entries every 24h
          }),
      secret: process.env.SESSION_SECRET || 'cybersecurity-education-platform-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
      },
    })
  );

  // Initialize passport and sessions
  app.use(passport.initialize());
  app.use(passport.session());
}

// Authentication middleware for protected routes
export function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized - Please login to access this resource' });
}

// Admin authorization middleware
export function isAdmin(req: any, res: any, next: any) {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ message: 'Forbidden - Admin access required' });
}

// Export passport for use in routes
export { passport };