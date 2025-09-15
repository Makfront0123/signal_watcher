"use client";

import { useEffect, useState } from "react";
import EventCard from "@/app/components/EventCard";
import WatchlistCard from "@/app/components/WatchlistCard";
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";

import { eventsService } from "@/app/services/eventService";
import { watchlistService } from "@/app/services/watchlistService";
import Link from "next/link";
import { getErrorMessage } from "./lib/getErrorMessage";

const ITEMS_PER_PAGE = 2;

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [eventPage, setEventPage] = useState(1);
  const [watchlistPage, setWatchlistPage] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsData, watchlistsData] = await Promise.all([
        eventsService.getAll(),
        watchlistService.getAll(),
      ]);
      setEvents(eventsData);
      setWatchlists(watchlistsData);
    } catch (err: unknown) {
      setError(getErrorMessage(err));

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  const paginatedEvents = events.slice(
    (eventPage - 1) * ITEMS_PER_PAGE,
    eventPage * ITEMS_PER_PAGE
  );

  const paginatedWatchlists = watchlists.slice(
    (watchlistPage - 1) * ITEMS_PER_PAGE,
    watchlistPage * ITEMS_PER_PAGE
  );

  const totalEventPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const totalWatchlistPages = Math.ceil(watchlists.length / ITEMS_PER_PAGE);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Signal Watcher</h1>


      <section>
        <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
          Eventos Recientes
          <Link href="/events" className="btn-primary">Crear Evento</Link>
        </h2>

        <div className="grid gap-4">
          {paginatedEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              description={event.description}
              severity={event.severity}
              suggestion={event.suggestion}
            />
          ))}
          {paginatedEvents.length === 0 && <p>No hay eventos</p>}
        </div>


        <div className="flex gap-2 mt-2">
          <button
            disabled={eventPage === 1}
            onClick={() => setEventPage((p) => p - 1)}
            className="btn-secondary"
          >
            Anterior
          </button>
          <span>Página {eventPage} de {totalEventPages}</span>
          <button
            disabled={eventPage === totalEventPages}
            onClick={() => setEventPage((p) => p + 1)}
            className="btn-secondary"
          >
            Siguiente
          </button>
        </div>
      </section>


      <section>
        <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">
          Watchlists
          <Link href="/watchlist" className="btn-primary">Crear Watchlist</Link>
        </h2>

        <div className="grid gap-4">
          {paginatedWatchlists.map((wl) => (
            <WatchlistCard key={wl.id} id={wl.id} name={wl.name} terms={wl.terms} />
          ))}
          {paginatedWatchlists.length === 0 && <p>No hay watchlists</p>}
        </div>


        <div className="flex gap-2 mt-2">
          <button
            disabled={watchlistPage === 1}
            onClick={() => setWatchlistPage((p) => p - 1)}
            className="btn-secondary"
          >
            Anterior
          </button>
          <span>Página {watchlistPage} de {totalWatchlistPages}</span>
          <button
            disabled={watchlistPage === totalWatchlistPages}
            onClick={() => setWatchlistPage((p) => p + 1)}
            className="btn-secondary"
          >
            Siguiente
          </button>
        </div>
      </section>
    </div>
  );
}
