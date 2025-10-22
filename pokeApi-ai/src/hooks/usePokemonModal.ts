// hooks/usePokemonModal.ts
import { useState } from "react";
import type { PokemonBasic, PokemonDetails } from "../types/pokemon";

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
        const res = await fetch(pokemon.url);
        if (!res.ok) throw new Error("Error al obtener detalles");
        const details: PokemonDetails = await res.json();
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
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pokemon: selected.name }),
      });

      if (!res.ok) {
        const data = await res.json();
        setFetchError(data.message || "Error al obtener dato curioso");
        return;
      }

      const data = await res.json();
      setCuriosity(data.datoCurioso);
    } catch {
      setFetchError("Error de conexión con el servidor");
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
