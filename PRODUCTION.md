# Production Deployment Guide

## Quick Start

1. **Copy the environment template**
   ```bash
   cp .env.production.example .env.production
   ```

2. **Edit `.env.production` with your production credentials**
   - Update database password
   - Update admin credentials
   - Add Google OAuth credentials (if using OAuth)
   - Generate random secrets for SESSION_SECRET and JWT_SECRET:
     ```bash
     openssl rand -base64 32
     ```

3. **Build and start the services**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.production up -d --build
   ```

4. **View logs**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml logs -f web
   ```

## Architecture

The production setup includes:

- **web**: Single container running both backend (Node.js/Express) and serving frontend static files
- **db**: PostgreSQL 15 database with persistent storage
- **redis**: Redis cache with persistent storage

All services include:
- Health checks
- Automatic restarts
- Persistent data volumes
- Proper networking

## Environment Variables

All credentials and configuration are managed via environment variables. See `.env.production.example` for the complete list.

### Required Variables
- `PGPASSWORD`: Database password
- `ADMIN_PASSWORD`: Admin user password
- `SESSION_SECRET`: Random string for session encryption
- `JWT_SECRET`: Random string for JWT signing

### Optional Variables
- `GOOGLE_CLIENT_ID`: For Google OAuth (if using)
- `GOOGLE_CLIENT_SECRET`: For Google OAuth (if using)
- `REDIS_PASSWORD`: Redis password (optional)
- `YALTT_HOST`: Your domain name
- `PORT`: Exposed port (default: 3000)

## Security Considerations

1. **Never commit `.env.production`** to version control
2. **Always change default passwords** before deploying
3. **Use strong, random secrets** for SESSION_SECRET and JWT_SECRET
4. **Enable SSL** in production (set SSL=true)
5. **Regularly update** Docker images and dependencies

## Database Migrations

Migrations in the `/migrations` directory are automatically run when the database container starts (via `docker-entrypoint-initdb.d`).

## Backup & Restore

### Backup Database
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec db pg_dump -U yaltt yaltt > backup.sql
```

### Restore Database
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec -T db psql -U yaltt yaltt < backup.sql
```

## Monitoring

The web service includes a health check endpoint at `/health` (make sure your backend implements this).

Check service health:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml ps
```

## Scaling

To run multiple instances of the web service behind a load balancer:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --scale web=3
```

Note: You'll need to configure a reverse proxy (nginx, traefik, etc.) to load balance between instances.

## Stopping Services

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down
```

To also remove volumes (⚠️ this deletes all data):
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v
```
