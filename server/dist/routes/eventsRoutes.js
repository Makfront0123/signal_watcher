"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRoutes = eventRoutes;
const eventsController_1 = require("../controllers/eventsController");
async function eventRoutes(fastify) {
    fastify.get("/api/events", eventsController_1.eventController.getAll);
    fastify.get("/api/events/:id", eventsController_1.eventController.getById);
    fastify.post("/api/events", eventsController_1.eventController.create);
    fastify.put("/api/events/:id", eventsController_1.eventController.update);
    fastify.delete("/api/events/:id", eventsController_1.eventController.delete);
}
