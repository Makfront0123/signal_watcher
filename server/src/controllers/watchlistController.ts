import { FastifyReply, FastifyRequest } from "fastify";
import { watchlistService } from "../services/watchlistServices";

interface IdParams {
  id: string;
}

export const watchlistController = {
  getAll: async (req: FastifyRequest, res: FastifyReply) => res.send(await watchlistService.getAll()),
  getById: async (req: FastifyRequest, res: FastifyReply) => {
    const id = Number((req.params as IdParams).id);
    const watchlist = await watchlistService.getById(id);
    if (!watchlist) return res.status(404).send({ error: "No encontrada" });
    return res.send(watchlist);
  },
  create: async (req: FastifyRequest, res: FastifyReply) => {
    const { name, terms } = req.body as { name: string; terms: string[] };
    if (!name || !terms) return res.status(400).send({ error: "name y terms requeridos" });
    const watchlist = await watchlistService.create(name, terms);
    return res.send(watchlist);
  },
  update: async (req: FastifyRequest, res: FastifyReply) => {
    const id = Number((req.params as IdParams).id);
    const data = req.body as Partial<{ name: string; terms: string[] }>;
    const updated = await watchlistService.update(id, data);
    return res.send(updated);
  },
  delete: async (req: FastifyRequest, res: FastifyReply) => {
    const id = Number((req.params as IdParams).id);
    await watchlistService.delete(id);
    return res.send({ success: true });
  },
};
