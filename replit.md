# Pentest Hardware Hub - Replit Development Guide

## Overview

Pentest Hardware Hub (hackerhardware.net) is a comprehensive cybersecurity educational platform designed for single-board computer enthusiasts and security professionals. The platform provides hardware information, learning paths, tutorials, tools documentation, and community resources for penetration testing and security research.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript for type safety
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with local strategy and bcrypt
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful endpoints with TypeScript interfaces

## Key Components

### Database Schema
- **Users**: Authentication, profiles, achievements, progress tracking
- **Content**: Hardware, tutorials, tools, articles, courses
- **Community**: Forum posts, comments, projects
- **Commerce**: Payment methods, orders, merchandise, subscriptions
- **Security**: Challenges, solutions, progress tracking
- **Notifications**: Email system for user engagement

### Authentication System
- Local authentication with username/password
- Password hashing with bcrypt
- Session-based authentication with PostgreSQL persistence
- Role-based access control (admin/user)

### Content Management
- Hardware library with categorization and compatibility checking
- Tutorial system with progress tracking
- Tool documentation with command examples
- Article system with rich content support
- Learning paths with structured progression

### UI/UX Design
- Dark theme with hacker-inspired green accent (#00FF00)
- Mobile-first responsive design
- Accessible components with ARIA labels
- Semantic HTML structure
- Custom CSS animations and transitions

## Data Flow

1. **User Authentication**: Login/register → Passport.js validation → Session creation → User context
2. **Content Delivery**: React components → TanStack Query → API endpoints → Database queries → Response
3. **Form Handling**: React Hook Form → Zod validation → API submission → Database update → UI feedback
4. **Real-time Updates**: Query invalidation → Background refetch → UI updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connection
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/react-***: Accessible UI component primitives
- **drizzle-orm**: Type-safe database queries and migrations
- **ai-chat-widget-agionic**: Integrated chat support widget

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast JavaScript bundler for production

### Authentication & Security
- **passport**: Authentication middleware
- **bcrypt**: Password hashing
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

## Deployment Strategy

### Development Environment
- Runs on Replit with hot reload via Vite
- Database provided by Neon PostgreSQL
- Environment variables managed through Replit secrets
- Development server accessible via proxy

### Production Deployment
- Frontend builds to static files in `dist/public`
- Backend bundles to `dist/index.js` using ESBuild
- Database migrations handled by Drizzle Kit
- Environment variables required: `DATABASE_URL`, `NODE_ENV`

### Build Process
1. Frontend: Vite builds React app to static files
2. Backend: ESBuild bundles TypeScript to single JavaScript file
3. Database: Drizzle migrations ensure schema consistency
4. Assets: Static files served from build directory

### Scaling Considerations
- Database connection pooling for concurrent users
- Session store scales with PostgreSQL
- Static assets can be served via CDN
- API endpoints designed for horizontal scaling

## Development Workflow

1. **Setup**: Clone repository, install dependencies, configure environment
2. **Database**: Run migrations using `npm run db:push`
3. **Development**: Start with `npm run dev` for hot reload
4. **Building**: Use `npm run build` for production builds
5. **Deployment**: Run `npm start` for production server

The codebase emphasizes type safety, modularity, and maintainability with comprehensive TypeScript interfaces shared between frontend and backend components.