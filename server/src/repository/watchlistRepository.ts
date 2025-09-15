import prisma from "../db/connect";

export const watchlistRepository = {
  findAll: () => prisma.watchlist.findMany({ include: { events: true } }),
  findById: (id: number) => prisma.watchlist.findUnique({ where: { id }, include: { events: true } }),
  create: (data: { name: string; terms: string[] }) => prisma.watchlist.create({ data }),
  update: (id: number, data: Partial<{ name: string; terms: string[] }>) =>
    prisma.watchlist.update({ where: { id }, data }),
  delete: (id: number) => prisma.watchlist.delete({ where: { id } }),
};
