import type { PokemonBasic, PokemonDetails } from "../types/pokemon";

export async function fetchPokemons(pageSize: number, offset: number): Promise<{ results: PokemonBasic[]; count: number }> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`);

  if (!res.ok) {
    throw new Error("Error fetching pokemons");
  }

  return res.json();
}

export async function fetchPokemonDetails(url: string): Promise<PokemonDetails> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener detalles");
  return res.json();
}

export async function fetchPokemonCuriosity(name: string): Promise<string> {
  const res = await fetch("https://pokeapi-ai-backend.onrender.com/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pokemon: name }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Error al obtener dato curioso");
  }

  const data = await res.json();
  return data.datoCurioso;
}