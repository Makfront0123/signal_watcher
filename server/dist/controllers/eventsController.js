"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventController = void 0;
const eventsServices_1 = require("../services/eventsServices");
exports.eventController = {
    getAll: async (req, res) => res.send(await eventsServices_1.eventService.getAll()),
    getById: async (req, res) => {
        const id = Number(req.params.id);
        const event = await eventsServices_1.eventService.getById(id);
        if (!event)
            return res.status(404).send({ error: "No encontrado" });
        return res.send(event);
    },
    create: async (req, res) => {
        const { description, watchlistId } = req.body;
        if (!description)
            return res.status(400).send({ error: "description requerido" });
        const event = await eventsServices_1.eventService.create(description, watchlistId);
        return res.send(event);
    },
    update: async (req, res) => {
        const id = Number(req.params.id);
        const data = req.body;
        const updated = await eventsServices_1.eventService.update(id, data);
        return res.send(updated);
    },
    delete: async (req, res) => {
        const id = Number(req.params.id);
        await eventsServices_1.eventService.delete(id);
        return res.send({ success: true });
    },
};
