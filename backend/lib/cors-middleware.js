import Cors from 'cors';
import { initMiddleware } from './init-middleware';

export const corsApiPokemon = initMiddleware(
  Cors({
    origin: ['http://localhost:5173', 'https://pokeapi-ai.netlify.app'], // Cambia esto
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);
