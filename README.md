# Signal Watcher

Micro-producto Full-Stack (Node.js + Next.js) para monitorizar eventos con integración de IA.

## Estructura del proyecto
- `server/`: Backend con Fastify, PostgreSQL y Redis.
- `client/`: Frontend con Next.js (App Router) y TailwindCSS.
- `prisma/`: Modelos y migraciones de la base de datos.

## Requisitos
- Node.js >= 20
- PostgreSQL
- Redis

## ⚙️ Configuración
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Makfront0123/signal_watcher.git

## Instalar Dependencias
cd server && npm install || pnpm install
cd ../client && npm install || pnpm install

# Backend
cd server
npm run dev

# Frontend
cd client
npm run dev

# Migrar a la base de datos
cd server
npx prisma migrate dev

