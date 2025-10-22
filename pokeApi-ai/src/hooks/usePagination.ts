import { useState, useEffect } from "react";
import { fetchPokemons } from "../core/api";
import type { PokemonBasic } from "../types/pokemon";

export function usePagination(pageSize: number) {
  const [pokemons, setPokemons] = useState<PokemonBasic[]>([]);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPage() {
      setLoading(true);
      setError(null);

      try {
        const offset = page * pageSize;
        const data = await fetchPokemons(pageSize, offset);
        setPokemons(data.results);
        setTotalCount(data.count);
      } catch {
        setError("Error al cargar la lista de Pokémon");
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
  }, [page, pageSize]);

  const totalPages = Math.ceil(totalCount / pageSize);

  function goToPage(newPage: number) {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  }

  return {
    pokemons,
    page,
    totalPages,
    loading,
    error,
    nextPage: () => setPage((p) => Math.min(p + 1, totalPages - 1)),
    prevPage: () => setPage((p) => Math.max(p - 1, 0)),
    setPage,
    goToPage, // <-- aquí la exportas
  };
}
