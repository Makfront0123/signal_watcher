const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function apiFetch(path: string, options?: RequestInit) {
  try {
    const headers: Record<string, string> = {};

 
    if (options?.body) {
      headers["Content-Type"] = "application/json";
    }

    const res = await fetch(`${BACKEND_URL}${path}`, {
      ...options,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error en la API");
    }

    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
