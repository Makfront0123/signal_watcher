import { FastifyReply, FastifyRequest } from "fastify";
import { eventService } from "../services/eventsServices";

export const eventController = {
  getAll: async (req: FastifyRequest, res: FastifyReply) => res.send(await eventService.getAll()),
  getById: async (req: FastifyRequest, res: FastifyReply) => {
    const id = Number((req.params as any).id);
    const event = await eventService.getById(id);
    if (!event) return res.status(404).send({ error: "No encontrado" });
    return res.send(event);
  },
  create: async (req: FastifyRequest, res: FastifyReply) => {
    const { description, watchlistId } = req.body as { description: string; watchlistId?: number };

    if (!description) return res.status(400).send({ error: "description requerido" });
    if (!watchlistId) return res.status(400).send({ error: "watchlistId requerido" });

    const event = await eventService.create(description, watchlistId);
    return res.send(event);
  },
  update: async (req: FastifyRequest, res: FastifyReply) => {
    const id = Number((req.params as any).id);
    const data = req.body as Partial<{ description: string; severity: string; suggestion: string; watchlistId: number }>;
    const updated = await eventService.update(id, data);
    return res.send(updated);
  },
  delete: async (req: FastifyRequest, res: FastifyReply) => {
    const id = Number((req.params as any).id);
    await eventService.delete(id);
    return res.send({ success: true });
  },
};
