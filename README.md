# Live Forum

Live Forum is a proof-of-concept discussion platform for realtime conversations. Users can browse topics, create threads, post replies, and see updates flow through the app without a full page refresh.

## Stack

- Frontend: [React](https://react.dev/), [ReactN](https://github.com/CharlesStover/reactn), [styled-components](https://styled-components.com/), [Bootstrap](https://getbootstrap.com/), [Shards React](https://designrevision.com/docs/shards-react/getting-started)
- Backend: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [FeathersJS](https://feathersjs.com/), [Socket.IO](https://socket.io/)
- Data: [Knex](https://knexjs.org/) with [SQLite](https://www.sqlite.org/)
- Auth: Feathers local authentication with JWT-based sessions

## What It Does

- Users can sign up, log in, and keep sessions persisted between client and server
- Users can browse topics, create discussion threads, and reply with comments
- Users can join realtime channels and exchange live messages over websockets
- Users can view their profile, delete their account, and follow other users
- Users can create forum topics/categories from the UI

## Run Locally

### Option 1: Docker development setup

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Client runs on `http://localhost:3000` and server runs on `http://localhost:3030`.

### Option 2: Run client and server separately

```bash
cd client
npm install
npm start
```

```bash
cd server
npm install
npm start
```

## Project Structure

- `client/`: React UI, routes, state, and realtime listeners
- `server/`: Feathers services, authentication, database models, and seed logic
