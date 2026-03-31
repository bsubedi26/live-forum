# Client (Create React App) + server (Feathers) in one image; API + SQLite + static UI
FROM node:18-bullseye AS client-build

WORKDIR /app/client
COPY client/package.json client/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY client/ ./
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV CI=false
RUN npm run build

FROM node:18-bullseye

WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/ ./
COPY --from=client-build /app/client/build ./public

ENV NODE_ENV=production
ENV PORT=3030
EXPOSE 3030

CMD ["node", "src/"]
