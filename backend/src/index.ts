import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../..', '.env') });

import express from 'express';
const app = express();

const PORT = process.env.BACKEND_PORT || 5000;

app.get('/api/telemetry', (req, res) => {
  res.json({ message: 'Hello from the backend!', data: [] });
});

// Bind to '0.0.0.0' to make the backend accessible from outside the container
app.listen(PORT as number, '0.0.0.0', () =>
  console.log(`Backend server is running on port ${PORT}`)
);
