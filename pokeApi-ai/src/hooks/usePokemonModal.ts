// hooks/usePokemonModal.ts
import { useState } from "react";
import type { PokemonBasic, PokemonDetails } from "../types/pokemon";
import { fetchPokemonCuriosity, fetchPokemonDetails } from "../core/api";

export function usePokemonModal(pokemonDetailsMap: Record<string, PokemonDetails>) {
  const [selected, setSelected] = useState<PokemonDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [curiosity, setCuriosity] = useState<string | null>(null);
  const [curiosityLoading, setCuriosityLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  async function openModal(pokemon: PokemonBasic) {
    setDetailsLoading(true);
    setCuriosity(null);
    setFetchError(null);

    try {
      if (pokemonDetailsMap[pokemon.name]) {
        setSelected(pokemonDetailsMap[pokemon.name]);
      } else {
        const details = await fetchPokemonDetails(pokemon.url); // Usa fetchPokemonDetails
        setSelected(details);
      }
    } catch {
      setFetchError("Error al obtener detalles");
    } finally {
      setDetailsLoading(false);
    }
  }

  async function fetchCuriosity() {
    if (!selected) return;
    setCuriosityLoading(true);
    setFetchError(null);
    setCuriosity(null);

    try {
      const curiosityData = await fetchPokemonCuriosity(selected.name); // Usa fetchPokemonCuriosity
      setCuriosity(curiosityData);
    } catch (error) {
      setFetchError(error instanceof Error ? error.message : "Error al obtener dato curioso");
    } finally {
      setCuriosityLoading(false);
    }
  }

  return {
    selected,
    openModal,
    onClose: () => setSelected(null),
    detailsLoading,
    curiosity,
    curiosityLoading,
    fetchError,
    fetchCuriosity,
  };
}
