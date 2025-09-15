import { Prisma } from "@prisma/client";
import prisma from "../db/connect";
export const eventRepository = {
  findAll: () =>
    prisma.event.findMany({ include: { watchlist: true } }),

  findById: (id: number) =>
    prisma.event.findUnique({ where: { id }, include: { watchlist: true } }),

  create: (data: { description: string; watchlistId: number; severity: string; suggestion: string }) =>
    prisma.event.create({
      data: data as Prisma.EventUncheckedCreateInput,
    }),

  update: (
    id: number,
    data: Partial<{
      description: string;
      severity: string;
      suggestion: string;
      watchlistId?: number;
    }>
  ) =>
    prisma.event.update({
      where: { id },
      data: {
        ...(data.description !== undefined && { description: data.description }),
        ...(data.severity !== undefined && { severity: data.severity }),
        ...(data.suggestion !== undefined && { suggestion: data.suggestion }),
        ...(data.watchlistId !== undefined && { watchlistId: data.watchlistId }),
      },
    }),


  delete: (id: number) =>
    prisma.event.delete({ where: { id } }),
};
