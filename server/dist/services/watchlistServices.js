"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchlistService = void 0;
const watchlistRepository_1 = require("../repository/watchlistRepository");
exports.watchlistService = {
    getAll: () => watchlistRepository_1.watchlistRepository.findAll(),
    getById: (id) => watchlistRepository_1.watchlistRepository.findById(id),
    create: (name, terms) => watchlistRepository_1.watchlistRepository.create({ name, terms }),
    update: (id, data) => watchlistRepository_1.watchlistRepository.update(id, data),
    delete: (id) => watchlistRepository_1.watchlistRepository.delete(id),
};
