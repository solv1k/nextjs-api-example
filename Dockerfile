# Используем официальный Node.js образ
FROM node:24-alpine AS base

# Устанавливаем pnpm с правильными настройками
RUN corepack enable pnpm && \
    corepack prepare pnpm@10.18.2 --activate

# Устанавливаем рабочую папку приложения
WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package*.json .npmrc* ./

# Стадия для установки зависимостей
FROM base AS deps
RUN pnpm install --prod && pnpm store prune

# Стадия для сборки приложения
FROM base AS builder
RUN pnpm install
COPY . .
RUN pnpm run build

# Финальная стадия
FROM node:24-alpine AS runner

# Устанавливаем pnpm с правильными настройками
RUN corepack enable pnpm && \
    corepack prepare pnpm@10.18.2 --activate

# Устанавливаем рабочую папку приложения
WORKDIR /app

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем зависимости из стадии deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Устанавливаем права
RUN chown -R nextjs:nodejs /app

# Переключаемся на пользователя nextjs
USER nextjs

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["pnpm", "run", "start"]
