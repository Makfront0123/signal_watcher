export const requestCounter = new Map<string, number>();

export const countRequest = (endpoint: string) => {
  requestCounter.set(endpoint, (requestCounter.get(endpoint) || 0) + 1);
};
