"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRepository = void 0;
const connect_1 = __importDefault(require("../db/connect"));
exports.eventRepository = {
    findAll: () => connect_1.default.event.findMany({ include: { watchlist: true } }),
    findById: (id) => connect_1.default.event.findUnique({ where: { id }, include: { watchlist: true } }),
    create: (data) => connect_1.default.event.create({ data: { ...data, watchlist: data.watchlistId ? { connect: { id: data.watchlistId } } : undefined } }),
    update: (id, data) => connect_1.default.event.update({
        where: { id },
        data: {
            description: data.description,
            severity: data.severity,
            suggestion: data.suggestion,
            watchlist: data.watchlistId ? { connect: { id: data.watchlistId } } : undefined,
        },
    }),
    delete: (id) => connect_1.default.event.delete({ where: { id } }),
};
