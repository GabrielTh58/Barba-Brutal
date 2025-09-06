FROM node:20-slim AS base

RUN apt-get update && apt-get install -y openssl libc6 && yarn global add turbo
 
FROM base AS builder

RUN apt-get update && apt-get install -y openssl
WORKDIR /usr/src/app    
COPY package.json .yarn* ./ 
COPY . .
RUN turbo prune backend --docker

FROM base AS installer
WORKDIR /usr/src/app
 
COPY .gitignore .gitignore
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/yarn.lock ./yarn.lock
COPY --from=builder /usr/src/app/out/full/ .
 
RUN yarn install --frozen-lockfile
COPY turbo.json turbo.json
RUN npx prisma generate --schema apps/backend/prisma/schema.prisma
RUN turbo run build --filter=backend... 
 
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
 
RUN apk add --no-cache openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs
 
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/package.json ./package.json
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/package.json ./apps/backend/package.json
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/dist ./apps/backend/dist
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/prisma ./apps/backend/prisma
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/packages ./packages
 
USER nodejs
WORKDIR /usr/src/app/apps/backend
RUN npx prisma generate

CMD node dist/src/main.js