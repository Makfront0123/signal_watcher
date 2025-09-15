"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchlistRoutes = watchlistRoutes;
const connect_1 = __importDefault(require("../db/connect"));
async function watchlistRoutes(fastify) {
    // Listar todas las watchlists con eventos
    fastify.get("/api/watchlists", async () => {
        return connect_1.default.watchlist.findMany({ include: { events: true } });
    });
    // Crear una nueva watchlist
    fastify.post("/api/watchlists", async (req, res) => {
        const { name, terms } = req.body;
        if (!name || !terms || !Array.isArray(terms)) {
            return res.status(400).send({ error: "name y terms son requeridos" });
        }
        const watchlist = await connect_1.default.watchlist.create({
            data: { name, terms },
        });
        return watchlist;
    });
    // Obtener watchlist por id
    fastify.get("/api/watchlists/:id", async (req, res) => {
        const id = Number(req.params.id);
        const watchlist = await connect_1.default.watchlist.findUnique({
            where: { id },
            include: { events: true },
        });
        if (!watchlist)
            return res.status(404).send({ error: "No encontrada" });
        return watchlist;
    });
    // Actualizar watchlist
    fastify.put("/api/watchlists/:id", async (req, res) => {
        const id = Number(req.params.id);
        const { name, terms } = req.body;
        const watchlist = await connect_1.default.watchlist.update({
            where: { id },
            data: { name, terms },
        });
        return watchlist;
    });
    // Eliminar watchlist
    fastify.delete("/api/watchlists/:id", async (req, res) => {
        const id = Number(req.params.id);
        await connect_1.default.watchlist.delete({ where: { id } });
        return { success: true };
    });
}
