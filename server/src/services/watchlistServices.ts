import redis from "../cache/redisClient";
import { watchlistRepository } from "../repository/watchlistRepository";

 
const WATCHLIST_TTL = 60 * 5;  

export const watchlistService = {
  getAll: async () => {
    const cacheKey = "watchlists:all";
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const data = await watchlistRepository.findAll();
    await redis.set(cacheKey, JSON.stringify(data), "EX", WATCHLIST_TTL);
    return data;
  },

  getById: async (id: number) => {
    const cacheKey = `watchlist:${id}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const wl = await watchlistRepository.findById(id);
    if (wl) await redis.set(cacheKey, JSON.stringify(wl), "EX", WATCHLIST_TTL);
    return wl;
  },

  create: async (name: string, terms: string[]) => {
    const newWL = await watchlistRepository.create({ name, terms });
    await redis.del("watchlists:all");  
    return newWL;
  },

  update: async (id: number, data: Partial<{ name: string; terms: string[] }>) => {
    const updated = await watchlistRepository.update(id, data);
    await redis.del("watchlists:all");
    await redis.del(`watchlist:${id}`);
    return updated;
  },

  delete: async (id: number) => {
    const deleted = await watchlistRepository.delete(id);
    await redis.del("watchlists:all");
    await redis.del(`watchlist:${id}`);
    return deleted;
  },
};
