FROM node:24-alpine AS dependencies
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV PSD_DATA_MODE=demo
ENV AUTH_MODE=demo
ENV ALLOW_DEMO_AUTH=true
ENV AUTH_SECRET=build-only-secret-build-only-secret
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
