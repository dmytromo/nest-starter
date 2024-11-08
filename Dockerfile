FROM node:20-alpine AS development

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

# Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
RUN npm pkg delete scripts.prepare && npm ci --only=production --omit=dev && npm cache clean --force
USER node

# production
FROM node:20-alpine AS production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
CMD [ "node", "dist/main.js" ]
