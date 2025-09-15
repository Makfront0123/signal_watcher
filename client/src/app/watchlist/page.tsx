"use client";

import { useEffect, useState } from "react";
import WatchlistCard from "@/app/components/WatchlistCard";
import WatchlistForm from "@/app/components/WatchlistForm";
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";

import { watchlistService } from "@/app/services/watchlistService";
import { getErrorMessage } from "../lib/getErrorMessage";

export default function WatchlistsPage() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWatchlists = async () => {
    try {
      setLoading(true);
      const data = await watchlistService.getAll();
      setWatchlists(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    }
    {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const handleCreated = () => {
    fetchWatchlists();
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Watchlists</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Crear Watchlist</h2>
        <WatchlistForm onCreated={handleCreated} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Lista de Watchlists</h2>
        <div className="grid gap-4">
          {watchlists.length === 0 && <p>No hay watchlists</p>}
          {watchlists.map((wl) => (
            <WatchlistCard id={wl.id} key={wl.id} name={wl.name} terms={wl.terms} />
          ))}
        </div>
      </section>
    </div>
  );
}
