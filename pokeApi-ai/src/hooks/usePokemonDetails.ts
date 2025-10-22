// hooks/usePokemonDetails.ts
import { useState, useEffect } from "react";
import type { PokemonBasic, PokemonDetails } from "../types/pokemon";

export function usePokemonDetails(pokemons: PokemonBasic[]) {
  const [pokemonDetailsMap, setPokemonDetailsMap] = useState<Record<string, PokemonDetails>>({});

  useEffect(() => {
    async function fetchDetails() {
      const missing = pokemons.filter((p) => !pokemonDetailsMap[p.name]);
      if (missing.length === 0) return;

      try {
        const promises = missing.map((p) =>
          fetch(p.url).then((res) => res.json())
        );
        const detailsArray = await Promise.all(promises);
        const newDetailsMap: Record<string, PokemonDetails> = {};
        detailsArray.forEach((det) => {
          newDetailsMap[det.name] = det;
        });
        setPokemonDetailsMap((prev) => ({ ...prev, ...newDetailsMap }));
      } catch {
        // Manejar error si quieres
      }
    }

    fetchDetails();
  }, [pokemons]);

  return { pokemonDetailsMap, setPokemonDetailsMap };
}
