FROM node:20-slim AS base
RUN apt-get update && apt-get install -y openssl && npm install -g turbo

# 2. O Construtor (Isola o escopo do backend)
FROM base AS builder
WORKDIR /usr/src/app
COPY . .
RUN turbo prune backend --docker

# 3. O Instalador (Baixa pacotes, compila o Prisma e faz o Build)
FROM base AS installer
WORKDIR /usr/src/app

COPY .gitignore .gitignore
COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/out/yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile

COPY --from=builder /usr/src/app/out/full/ .
COPY turbo.json turbo.json

# Truque do dado fake para o Prisma não barrar o build da imagem
RUN DATABASE_URL="postgresql://fake:fake@localhost:5432/fake" \
    npx prisma generate --schema apps/backend/prisma/schema.prisma

# Compila o backend e o packages/core
RUN turbo run build --filter=backend... 

# 4. A Produção (Imagem final ultra leve)
FROM node:20-slim AS runner
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Criamos o usuário de segurança sem precisar instalar o Alpine apk
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs

# Copiamos as raízes e as dependências compartilhadas
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/package.json ./package.json
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/node_modules ./node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/packages ./packages

# Copiamos os artefatos do backend
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/prisma ./prisma
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/package.json ./apps/backend/package.json
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=installer --chown=nodejs:nodejs /usr/src/app/apps/backend/dist ./apps/backend/dist

# Execução limpa
USER nodejs
WORKDIR /usr/src/app/apps/backend

CMD ["sh", "-c", "npx prisma migrate deploy --schema=./prisma/schema.prisma && node dist/src/main.js"]
