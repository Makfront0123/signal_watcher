import { useEffect, useState } from "react";
import { eventsService } from "@/app/services/eventService";
import { watchlistService } from "@/app/services/watchlistService";
import toast from "react-hot-toast";
const EventForm = ({ onCreated }: { onCreated: () => void }) => {
  const [description, setDescription] = useState("");
  const [watchlistId, setWatchlistId] = useState<number | undefined>(undefined);
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const data = await watchlistService.getAll();
        setWatchlists(data);
        if (data.length > 0) setWatchlistId(data[0].id);
      } catch {
        setError("Error al cargar watchlists");
      }
    };
    fetchWatchlists();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!watchlistId) return setError("Selecciona una watchlist");

    try {
      await eventsService.create({ description, watchlistId });
      toast.success("Evento creado correctamente");
      setDescription("");
      onCreated();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {error && <div className="text-red-600">{error}</div>}

      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />

      <select
        value={watchlistId}
        onChange={(e) => setWatchlistId(Number(e.target.value))}
        className="border p-2 rounded"
      >
        {watchlists.map((wl) => (
          <option key={wl.id} value={wl.id}>
            {wl.name}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Crear Evento
      </button>
    </form>
  );
};

export default EventForm;
