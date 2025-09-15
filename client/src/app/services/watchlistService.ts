import { apiFetch } from "./api";

export const watchlistService = {
  getAll: () => apiFetch("/api/watchlists"),
  getById: (id: number) => apiFetch(`/api/watchlists/${id}`),
  update: (id: number, data: Partial<{ name: string; terms: string[] }>) =>
    apiFetch(`/api/watchlists/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch(`/api/watchlists/${id}`, { method: "DELETE" }),
  create: (data: { name: string; terms: string[] }) =>
    apiFetch("/api/watchlists", { method: "POST", body: JSON.stringify(data) }),
};
