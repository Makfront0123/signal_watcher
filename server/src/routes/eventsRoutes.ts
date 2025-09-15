import { FastifyInstance } from "fastify";
import { eventController } from "../controllers/eventsController";

export async function eventRoutes(fastify: FastifyInstance) {
  fastify.get("/api/events", eventController.getAll);
  fastify.get("/api/events/:id", eventController.getById);
  fastify.post("/api/events", eventController.create);
  fastify.put("/api/events/:id", eventController.update);
  fastify.delete("/api/events/:id", eventController.delete);
}
