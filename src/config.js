// ── Базовый URL для API ──────────────────────────────────────────────
// По умолчанию запросы идут на тот же хост (`/api/...`), поэтому сайт
// работает на ПК, телефоне и в Telegram Mini App через один ngrok-туннель.
//   - в разработке Vite сам проксирует /api на localhost:3002 (vite.config.js)
//   - в production server.js отдаёт статику и /api с одного порта
// Если API хостится отдельно — задайте переменную VITE_API_URL, например
// в файле .env:  VITE_API_URL=https://api.example.com
export const API_BASE_URL = import.meta.env.VITE_API_URL || ''