# Environment Configuration Setup

This document explains how to set up the environment files for the Inventory Management System with Supabase PostgreSQL.

## Environment Files Created

### Server Environment (`.env`)
Located in: `server/.env`

**Required Variables:**
- `DATABASE_URL`: Supabase PostgreSQL connection string
- `PORT`: Server port (default: 8000)
- `NODE_ENV`: Environment mode (development/production)

**Optional Variables:**
- `AWS_ACCESS_KEY_ID`: AWS access key for S3
- `AWS_SECRET_ACCESS_KEY`: AWS secret key for S3
- `AWS_REGION`: AWS region (default: us-east-2)
- `S3_BUCKET_NAME`: S3 bucket name for file uploads
- `JWT_SECRET`: Secret key for JWT authentication
- `ALLOWED_ORIGINS`: CORS allowed origins
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key

### Client Environment (`.env.local`)
Located in: `client/.env.local`

**Required Variables:**
- `NEXT_PUBLIC_API_BASE_URL`: Backend API URL (default: http://localhost:8000)

**Optional Variables:**
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NEXT_PUBLIC_APP_VERSION`: Application version
- `NODE_ENV`: Environment mode

## Setup Instructions

### 1. Supabase Database Setup

1. Create a Supabase account at https://app.supabase.com
2. Create a new project
3. Wait for the database to be provisioned
4. Go to **Settings > Database** to find your connection details:
   - **Connection String (URL)**: This is your PostgreSQL connection string
5. Copy the connection string and add it to your `server/.env`:
   ```
   DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres?schema=public"
   ```
   > Replace `[PASSWORD]`, `[HOST]`, and `[PORT]` with your actual Supabase credentials

6. (Optional) Get additional Supabase keys from **Settings > API**:
   ```
   SUPABASE_URL=https://[project-id].supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### 2. Server Configuration

1. Navigate to the `server` directory
2. Copy `.env.example` to `.env` if needed
3. Update the environment variables with your Supabase connection details
4. Run database migrations to create tables:
   ```bash
   npx prisma migrate dev --name init
   ```
5. (Optional) Seed the database with sample data:
   ```bash
   npm run seed
   ```
   > The seed function is currently commented out. Uncomment and customize the Prisma queries in `prisma/seed.ts` to add your data.

### 3. Client Configuration

1. Navigate to the `client` directory
2. Create `.env.local` file (or copy from `.env.example` if available)
3. Update `NEXT_PUBLIC_API_BASE_URL` to match your server URL:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   ```
4. The client should automatically connect to the backend

### 4. AWS S3 Configuration (Optional)

If you plan to use AWS S3 for file uploads:

1. Create an AWS account and S3 bucket
2. Create an IAM user with S3 permissions
3. Add the AWS credentials to `server/.env`:
   ```
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=us-east-2
   S3_BUCKET_NAME=your-bucket-name
   ```

## Running the Application

### Development Mode

1. Start the server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the client (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```

3. Access the application:
   - Client: http://localhost:3000 (or 3001 if 3000 is in use)
   - Server API: http://localhost:8000

### Production Mode

For production deployment with Supabase:

1. Update your Supabase project to production mode
2. Use the production database credentials in your `.env` file
3. Set `NODE_ENV=production`
4. Deploy the server and client to your hosting platform

## Seeding Data

The seeding functionality has been updated to use Prisma queries instead of JSON file reads:

1. Edit `server/prisma/seed.ts` to uncomment the examples
2. Customize the Prisma queries with your data
3. Run `npm run seed` to insert data into your database

Example seed code:
```typescript
await prisma.brand.create({
  data: {
    brandId: "1",
    name: "Brand Name",
    description: "Brand Description",
  },
});
```

## Important Notes

- Never commit actual environment files (`.env`, `.env.local`) to version control
- Use `.env.example` files as templates for required variables
- Keep your Supabase database credentials secure
- Update `NEXT_PUBLIC_API_BASE_URL` when deploying to production
- The server must be running before starting the client for API calls to work
- Supabase provides automatic backups and point-in-time recovery

## Troubleshooting

### Database Connection Issues
- Verify your DATABASE_URL is correct
- Check that Supabase project is active
- Ensure your IP is whitelisted (check Supabase > Settings > Database)

### Migration Issues
- If migrations fail, check `prisma/migrations/` for any conflicts
- Run `npx prisma migrate resolve --rolled-back` if needed
- Consult Prisma documentation: https://www.prisma.io/docs/orm/prisma-migrate

### Performance
- Monitor your database with Supabase Dashboard
- Use Prisma's query logging: `PRISMA_QUERY_ENGINE_LIBRARY=libquery_engine_debug`
