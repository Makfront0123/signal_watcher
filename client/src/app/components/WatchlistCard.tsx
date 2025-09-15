import React, { useState } from "react";
import { watchlistService } from "@/app/services/watchlistService";
import toast from "react-hot-toast";

const WatchlistCard: React.FC<WatchlistCardProps> = ({
  id,
  name,
  terms,
  onDeleted,
  onUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [currentTerms, setCurrentTerms] = useState(terms.join(", "));

  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar esta watchlist?")) return;

    try {
      await watchlistService.delete(id);
      toast.success("Watchlist eliminada correctamente");
      onDeleted?.();
    } catch (err: any) {
      const msg = err.message || "";
      if (msg.includes("Foreign key constraint")) {
        toast.error("No se puede eliminar la watchlist: primero elimina sus eventos asociados.");
      } else {
        toast.error("Error al eliminar: " + msg);
      }
    }

  };


  const handleSave = async () => {
    try {
      await watchlistService.update(id, {
        name: currentName,
        terms: currentTerms.split(",").map(t => t.trim()),
      });
      toast.success("Watchlist actualizada correctamente");
      onUpdated?.();
      setIsEditing(false);
    } catch (err: any) {
      toast.error("Error al actualizar: " + err.message);
    }
  };

  return (
    <div className="p-4 border rounded shadow flex flex-col gap-2">
      {isEditing ? (
        <>
          <input
            className="border p-1 rounded"
            value={currentName}
            onChange={(e) => setCurrentName(e.target.value)}
          />
          <input
            className="border p-1 rounded"
            value={currentTerms}
            onChange={(e) => setCurrentTerms(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setCurrentName(name);
                setCurrentTerms(terms.join(", "));
              }}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <p><strong>{currentName}</strong></p>
          <ul>
            {currentTerms.split(",").map((t, i) => <li key={i}>{t.trim()}</li>)}
          </ul>
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

export default WatchlistCard;
