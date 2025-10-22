// lib/rateLimiter.js
import rateLimit from 'next-rate-limit';

const limiter = rateLimit({
  interval: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
  uniqueTokenPerInterval: 500,   // Máximo 500 IPs a trackear
});

export default limiter;
