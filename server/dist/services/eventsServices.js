"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventService = void 0;
const eventsRepository_1 = require("../repository/eventsRepository");
exports.eventService = {
    getAll: () => eventsRepository_1.eventRepository.findAll(),
    getById: (id) => eventsRepository_1.eventRepository.findById(id),
    create: (description, watchlistId) => eventsRepository_1.eventRepository.create({ description, watchlistId }),
    update: (id, data) => eventsRepository_1.eventRepository.update(id, data),
    delete: (id) => eventsRepository_1.eventRepository.delete(id),
};
