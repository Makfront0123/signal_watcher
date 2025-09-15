import React, { useState } from "react";
import { eventsService } from "@/app/services/eventService";
import toast from "react-hot-toast";

 
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

  const handleDelete = async () => {
  if (!confirm("¿Seguro que quieres eliminar este evento?")) return;
  try {
    await eventsService.delete(id);
    onDeleted?.();
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert("Error al eliminar: " + err.message);
    } else {
      alert("Error desconocido al eliminar");
    }
  }
};

const handleSave = async () => {
  try {
    await eventsService.update(id, { description: desc, severity: sev, suggestion: sug });
    onUpdated?.();
    toast.success("Evento actualizado correctamente");
    setIsEditing(false);
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert("Error al actualizar: " + err.message);
    } else {
      alert("Error desconocido al actualizar");
    }
  }
};


  return (
    <div className="p-4 border rounded shadow flex flex-col gap-2">
      {isEditing ? (
        <>
          <input
            className="border p-1 rounded"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            className="border p-1 rounded"
            value={sev}
            onChange={(e) => setSev(e.target.value)}
          />
          <input
            className="border p-1 rounded"
            value={sug}
            onChange={(e) => setSug(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Guardar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
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
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
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
