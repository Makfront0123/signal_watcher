"use client";

import React, { useState } from "react";
import { watchlistService } from "@/app/services/watchlistService";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../lib/getErrorMessage";

interface WatchlistCardProps {
  id: number;
  name: string;
  onDeleted?: () => void;
  onUpdated?: () => void;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({
  id,
  name,
  onDeleted,
  onUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar esta watchlist?")) return;
    try {
      await watchlistService.delete(id);
      toast.success("Watchlist eliminada");
      onDeleted?.();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleSave = async () => {
    try {
      await watchlistService.update(id, { name: newName });
      toast.success("Watchlist actualizada");
      setIsEditing(false);
      onUpdated?.();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="p-4 border rounded shadow flex flex-col gap-2">
      {isEditing ? (
        <>
          <input
            className="border p-1 rounded"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
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
          <p><strong>Nombre:</strong> {newName}</p>
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
