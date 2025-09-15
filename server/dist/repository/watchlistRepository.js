"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchlistRepository = void 0;
const connect_1 = __importDefault(require("../db/connect"));
exports.watchlistRepository = {
    findAll: () => connect_1.default.watchlist.findMany({ include: { events: true } }),
    findById: (id) => connect_1.default.watchlist.findUnique({ where: { id }, include: { events: true } }),
    create: (data) => connect_1.default.watchlist.create({ data }),
    update: (id, data) => connect_1.default.watchlist.update({ where: { id }, data }),
    delete: (id) => connect_1.default.watchlist.delete({ where: { id } }),
};
