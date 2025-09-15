import { apiFetch } from "./api";

export const eventsService = {
  getAll: () => apiFetch("/api/events"),
  getById: (id: number) => apiFetch(`/api/events/${id}`),
  create: (data: { description: string; watchlistId: number }) =>
    apiFetch("/api/events", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Partial<{ description: string; severity: string; suggestion: string }>) =>
    apiFetch(`/api/events/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch(`/api/events/${id}`, { method: "DELETE" }),
};
