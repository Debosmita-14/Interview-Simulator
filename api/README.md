# API Serverless Functions

This directory contains Vercel serverless functions for the Interview Simulator backend.

## Structure

```
api/
├── auth/
│   ├── register.js      # POST /api/auth/register - User registration
│   └── login.js         # POST /api/auth/login - User login
├── _lib/
│   ├── config/
│   │   └── database.js  # MongoDB connection with connection reuse
│   ├── models/
│   │   └── User.js      # User model schema
│   └── services/
│       └── authService.js # Authentication business logic
└── package.json         # Dependencies for serverless functions
```

## Environment Variables Required

When deploying to Vercel, you must set these environment variables:

- `MONGODB_URI` - MongoDB connection string (e.g., mongodb+srv://user:pass@cluster.mongodb.net/dbname)
- `JWT_SECRET` - Secret key for JWT token generation (e.g., random 32+ character string)
- `NODE_ENV` - Environment (production/development)

## How It Works

Each file in the `api/` directory becomes a serverless function endpoint:
- `api/auth/register.js` → `/api/auth/register`
- `api/auth/login.js` → `/api/auth/login`

## CORS

All endpoints include proper CORS headers to allow cross-origin requests from the frontend.

## Database Connection

The database connection is optimized for serverless:
- Connection reuse to minimize cold starts
- 5-second timeout for serverless environment
- Cached connection across invocations

## Testing Locally

To test serverless functions locally:

1. Install dependencies:
   ```bash
   cd api
   npm install
   ```

2. Use Vercel CLI:
   ```bash
   npm install -g vercel
   vercel dev
   ```

This will start a local development server that simulates Vercel's serverless environment.
