# Local Development with Docker Hot-Reload

## Quick Start

Instead of using `docker-compose.yml`, use the development configuration:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

## How It Works

- **Client** (React): Runs on port 3000 with hot module reloading
- **Server** (Feathers): Runs on port 3030 with nodemon watching for file changes
- **Volumes**: Both `/app/client` and `/app/server` are mounted from your local filesystem
- **node_modules**: Kept isolated in containers (not synced locally)

## Making Changes

- Edit files in `client/src/` → Changes appear immediately in the browser (React HMR)
- Edit files in `server/src/` → Server automatically restarts (nodemon)
- No rebuild needed!

## Stopping

```bash
docker-compose -f docker-compose.dev.yml down
```

## Production Build

For production, continue using the original compose file (this builds optimized images):

```bash
docker-compose up --build
```

## Notes

- The original `Dockerfile` and `docker-compose.yml` remain unchanged for production
- `Dockerfile.dev` installs dev dependencies and runs both services with watchers
- If you modify `package.json` in either folder, rebuild: `docker-compose -f docker-compose.dev.yml up --build`
