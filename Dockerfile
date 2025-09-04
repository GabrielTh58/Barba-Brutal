FROM node:20-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend ./apps/backend
COPY packages/core ./packages/core

RUN npm ci --no-fund --no-optional

WORKDIR /app/apps/backend
RUN npx prisma generate
RUN npm run build


FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/apps/backend/prisma ./prisma
COPY --from=builder /app/apps/backend/package.json ./package.json

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
