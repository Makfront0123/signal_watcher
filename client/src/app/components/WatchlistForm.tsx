"use client";

import { useState } from "react";
import { watchlistService } from "@/app/services/watchlistService";
import toast from "react-hot-toast";

export default function WatchlistForm({ onCreated }: WatchlistFormProps) {
  const [name, setName] = useState("");
  const [terms, setTerms] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !terms) return setError("Nombre y términos son requeridos");

    setLoading(true);

    try {
      
      const termsArray = terms.split(",").map((t) => t.trim()).filter(Boolean);

      await watchlistService.create({ name, terms: termsArray });
      toast.success("Watchlist creada correctamente");

       
      setName("");
      setTerms("");

       
      onCreated?.();
    } catch (err: any) {
      setError(err.message || "Error al crear la watchlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Nombre de la watchlist"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Términos separados por coma"
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Creando..." : "Crear Watchlist"}
      </button>
    </form>
  );
}
