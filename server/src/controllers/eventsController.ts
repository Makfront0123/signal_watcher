import { FastifyRequest, FastifyReply } from "fastify";
import { eventService } from "../services/eventsServices";

 

interface IdParams {
  id: string;
}

export const eventController = {
  getAll: async (req: FastifyRequest, res: FastifyReply) => {
    return res.send(await eventService.getAll());
  },

  getById: async (req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply) => {
    const id = Number(req.params.id);
    const event = await eventService.getById(id);
    if (!event) return res.status(404).send({ error: "No encontrado" });
    return res.send(event);
  },

  create: async (
    req: FastifyRequest<{ Body: { description: string; watchlistId?: number } }>,
    res: FastifyReply
  ) => {
    const { description, watchlistId } = req.body;

    if (!description) return res.status(400).send({ error: "description requerido" });
    if (!watchlistId) return res.status(400).send({ error: "watchlistId requerido" });

    const event = await eventService.create(description, watchlistId);
    return res.send(event);
  },

  update: async (
    req: FastifyRequest<{
      Params: IdParams;
      Body: Partial<{ description: string; severity: string; suggestion: string; watchlistId: number }>;
    }>,
    res: FastifyReply
  ) => {
    const id = Number(req.params.id);
    const updated = await eventService.update(id, req.body);
    return res.send(updated);
  },

  delete: async (req: FastifyRequest<{ Params: IdParams }>, res: FastifyReply) => {
    const id = Number(req.params.id);
    await eventService.delete(id);
    return res.send({ success: true });
  },
};
