export const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST || 'localhost';
export const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || '5001';

// Render automatically routes traffic, so we remove ports in production
const isProduction = window.location.hostname !== 'localhost';

// Use `wss://` for secure WebSockets if the frontend is on HTTPS
const WS_PROTOCOL = window.location.protocol === 'https:' ? 'wss' : 'ws';
const REST_PROTOCOL = window.location.protocol === 'https:' ? 'https' : 'http';

// WebSocket URL (Remove port in production, keep in local dev)
export const WS_URL = isProduction
  ? `${WS_PROTOCOL}://${BACKEND_HOST}/ws`
  : `${WS_PROTOCOL}://${BACKEND_HOST}:${BACKEND_PORT}/ws`;

// REST API URL (Remove port in production, keep in local dev)
export const REST_URL = isProduction
  ? `${REST_PROTOCOL}://${BACKEND_HOST}/api`
  : `${REST_PROTOCOL}://${BACKEND_HOST}:${BACKEND_PORT}/api`;

console.log('WebSocket URL:', WS_URL);
console.log('API URL:', REST_URL);
