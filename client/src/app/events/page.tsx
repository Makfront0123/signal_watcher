"use client";

import React, { useEffect, useState } from "react";
import EventForm from "@/app/components/EventForm";
import EventCard from "@/app/components/EventCard";
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";
import { eventsService } from "@/app/services/eventService";
import { getErrorMessage } from "../lib/getErrorMessage";


interface Event {
  id: number;
  description: string;
  severity: string;
  suggestion: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsService.getAll();
      setEvents(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreated = () => {
    fetchEvents();
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Eventos</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Crear Evento</h2>
        <EventForm onCreated={handleCreated} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Lista de Eventos</h2>
        <div className="grid gap-4">
          {events.length === 0 && <p>No hay eventos</p>}
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              description={event.description}
              severity={event.severity}
              suggestion={event.suggestion}
              onUpdated={fetchEvents}
              onDeleted={fetchEvents}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
