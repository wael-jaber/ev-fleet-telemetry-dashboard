export const BACKEND_HOST = import.meta.env.BACKEND_HOST || "localhost";
export const BACKEND_PORT = Number(import.meta.env.BACKEND_PORT) || 5001;

export const WS_URL = `ws://${BACKEND_HOST}:${BACKEND_PORT}/ws`;
export const REST_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}/api`;

console.log("Backend Host:", BACKEND_HOST);
console.log("Backend Port:", BACKEND_PORT);
console.log("WebSocket URL:", WS_URL);
console.log("API URL:", REST_URL);
