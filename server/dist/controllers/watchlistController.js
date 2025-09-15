"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchlistController = void 0;
const watchlistServices_1 = require("../services/watchlistServices");
exports.watchlistController = {
    getAll: async (req, res) => res.send(await watchlistServices_1.watchlistService.getAll()),
    getById: async (req, res) => {
        const id = Number(req.params.id);
        const watchlist = await watchlistServices_1.watchlistService.getById(id);
        if (!watchlist)
            return res.status(404).send({ error: "No encontrada" });
        return res.send(watchlist);
    },
    create: async (req, res) => {
        const { name, terms } = req.body;
        if (!name || !terms)
            return res.status(400).send({ error: "name y terms requeridos" });
        const watchlist = await watchlistServices_1.watchlistService.create(name, terms);
        return res.send(watchlist);
    },
    update: async (req, res) => {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await watchlistServices_1.watchlistService.update(id, data);
        return res.send(updated);
    },
    delete: async (req, res) => {
        const id = Number(req.params.id);
        await watchlistServices_1.watchlistService.delete(id);
        return res.send({ success: true });
    },
};
