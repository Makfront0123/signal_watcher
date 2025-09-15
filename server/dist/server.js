"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const watchlistsRoutes_1 = require("./routes/watchlistsRoutes");
const eventsRoutes_1 = require("./routes/eventsRoutes");
async function buildServer() {
    const fastify = (0, fastify_1.default)({
        logger: true, // Logs estructurados
    });
    // Middlewares
    await fastify.register(cors_1.default, { origin: "*" });
    await fastify.register(helmet_1.default);
    // Health check básico
    fastify.get("/health", async () => ({ status: "ok" }));
    fastify.get("/api/hello", async () => ({ message: "Hello from Fastify + TypeScript 🚀" }));
    // Registrar rutas (capas routes → controllers → services → repository)
    await (0, watchlistsRoutes_1.watchlistRoutes)(fastify);
    await (0, eventsRoutes_1.eventRoutes)(fastify);
    return fastify;
}
// Levantar el servidor
buildServer()
    .then((app) => {
    const port = process.env.PORT ? Number(process.env.PORT) : 3001;
    app.listen({ port, host: "0.0.0.0" }, (err, address) => {
        if (err) {
            app.log.error(err);
            process.exit(1);
        }
        console.log(`🚀 Server running at ${address}`);
    });
})
    .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
});
