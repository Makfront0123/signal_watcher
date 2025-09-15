import redis from "../cache/redisClient";
import { eventRepository } from "../repository/eventsRepository";
import { classifyEventMock } from "./aiService";

const EVENT_TTL = 60 * 5;  

export const eventService = {
  getAll: async () => {
    const cacheKey = "events:all";
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const events = await eventRepository.findAll();
    await redis.set(cacheKey, JSON.stringify(events), "EX", EVENT_TTL);
    return events;
  },

  getById: async (id: number) => {
    const cacheKey = `events:${id}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const event = await eventRepository.findById(id);
    if (event) await redis.set(cacheKey, JSON.stringify(event), "EX", EVENT_TTL);
    return event;
  },

  create: async (description: string, watchlistId: number) => {
    const aiData = await classifyEventMock(description);
    const newEvent = await eventRepository.create({
      description,
      watchlistId,
      severity: aiData.severity,
      suggestion: aiData.suggestion,
    });
    await redis.del("events:all");  
    return newEvent;
  },

  update: async (id: number, data: Partial<{ description: string; severity: string; suggestion: string; watchlistId?: number }>) => {
    const updated = await eventRepository.update(id, data);
    await redis.del("events:all");  
    await redis.del(`events:${id}`);  
    return updated;
  },

  delete: async (id: number) => {
    const deleted = await eventRepository.delete(id);
    await redis.del("events:all");
    await redis.del(`events:${id}`);
    return deleted;
  },
};
