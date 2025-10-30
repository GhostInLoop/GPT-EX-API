// server.js has been removed in favor of serverless functions under `/api/`.
// Keeping this file as a harmless placeholder to avoid accidental use.

export default function handler(req, res) {
  res.status(410).json({ error: "server.js deprecated. Use /api/compliments/random" });
}