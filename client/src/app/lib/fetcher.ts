export const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error en la petición");
  }

  return res.json();
};
