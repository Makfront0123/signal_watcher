# ADR - Decisiones Técnicas Clave

## 1. Framework backend: Fastify
- **Alternativas consideradas:** Express.
- **Decisión:** Usar **Fastify**.
- **Motivación:** Mejor rendimiento por defecto, soporte de TypeScript sólido y ecosistema de plugins maduro.
- **Consecuencia:** Menor curva de aprendizaje para desarrolladores que ya manejan Express, pero mayor performance y escalabilidad.

---

## 2. Base de datos: PostgreSQL
- **Alternativas consideradas:** MySQL, MongoDB.
- **Decisión:** Usar **PostgreSQL**.
- **Motivación:** Soporte nativo a relaciones complejas, integridad referencial y compatibilidad con Prisma.
- **Consecuencia:** Mayor robustez a cambio de mayor complejidad inicial en la configuración.

---

## 3. ORM: Prisma
- **Alternativas consideradas:** TypeORM, Sequelize.
- **Decisión:** Usar **Prisma**.
- **Motivación:** Generación automática de tipos y migraciones consistentes.
- **Consecuencia:** Dependencia en una capa adicional, pero productividad significativamente mayor.

---

## 4. Cache y Pub/Sub: Redis
- **Alternativas consideradas:** Solo DB, RabbitMQ.
- **Decisión:** Usar **Redis**.
- **Motivación:** Simplicidad para cachear y manejar notificaciones/eventos livianos.
- **Consecuencia:** Agrega un servicio externo más a desplegar, pero mejora el rendimiento.

---

## 5. Frontend: Next.js (App Router) + TailwindCSS
- **Alternativas consideradas:** CRA, Vite + React.
- **Decisión:** Usar **Next.js** con **App Router**.
- **Motivación:** Routing moderno, SSR/SSG nativos, optimización de performance y buena integración full-stack.
- **Consecuencia:** Ligera curva de aprendizaje del App Router, pero mayor escalabilidad.

---

## 6. Integración de IA: Mock service (`aiService`)
- **Alternativas consideradas:** Llamar a OpenAI u otra API de IA real.
- **Decisión:** Implementar un **servicio mock** con reglas básicas.
- **Motivación:** Cumplir requisitos del micro-producto sin costos ni dependencias externas.
- **Consecuencia:** Resultados simulados, pero estructura lista para sustituir por un proveedor real.

---
