import Cors from 'cors';
import { initMiddleware } from './init-middleware';

export const corsApiPokemon = initMiddleware(
  Cors({
    origin: ['http://localhost:3000', 'https://tudominio.com'], // Cambia esto
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);
