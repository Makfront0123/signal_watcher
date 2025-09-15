import React, { useState } from "react";
import { eventsService } from "@/app/services/eventService";
import toast from "react-hot-toast";
import { getErrorMessage } from "../lib/getErrorMessage";

 const EventCard: React.FC<EventCardProps> = ({
  id,
  description,
  severity,
  suggestion,
  onDeleted,
  onUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [desc, setDesc] = useState(description);
  const [sev, setSev] = useState(severity);
  const [sug, setSug] = useState(suggestion);
  const [loading, setLoading] = useState(false);  

  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar este evento?")) return;
    setLoading(true);  
    try {
      await eventsService.delete(id);
      toast.success("Evento eliminado");
      onDeleted?.();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false); 
    }
  };

  const handleSave = async () => {
    setLoading(true);  
    try {
      await eventsService.update(id, { description: desc, severity: sev, suggestion: sug });
      toast.success("Evento actualizado correctamente");
      setIsEditing(false);
      onUpdated?.();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);  
    }
  };

  return (
    <div className="p-4 border rounded shadow flex flex-col gap-2">
      {isEditing ? (
        <>
          <input className="border p-1 rounded" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <input className="border p-1 rounded" value={sev} onChange={(e) => setSev(e.target.value)} />
          <input className="border p-1 rounded" value={sug} onChange={(e) => setSug(e.target.value)} />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <p><strong>Descripción:</strong> {desc}</p>
          <p><strong>Severidad:</strong> {sev}</p>
          <p><strong>Sugerencia:</strong> {sug}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Eliminando..." : "Eliminar"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              Editar
            </button>
          </div>
        </>
      )}
    </div>
  );
};


export default EventCard;
