import { FastifyInstance } from "fastify";
import { watchlistController } from "../controllers/watchlistController";

export async function watchlistRoutes(fastify: FastifyInstance) {
  fastify.get("/api/watchlists", watchlistController.getAll);
  fastify.post("/api/watchlists", watchlistController.create);
  fastify.get("/api/watchlists/:id", watchlistController.getById);
  fastify.put("/api/watchlists/:id", watchlistController.update);
  fastify.delete("/api/watchlists/:id", watchlistController.delete);
}
