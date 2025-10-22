import { usePagination } from "./hooks/usePagination";
import { usePokemonDetails } from "./hooks/usePokemonDetails";
import { usePokemonModal } from "./hooks/usePokemonModal";

import PokemonCard from "./components/PokemonCard";
import Pagination from "./components/Pagination";
import PokemonModal from "./components/PokemonModal";
import AnimatedReveal from "./components/AnimatedReveal";
import Nav from "./components/Nav";

export default function App() {
  const {
    pokemons,
    page,
    totalPages,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage
  } = usePagination(20);

  const { pokemonDetailsMap } = usePokemonDetails(pokemons);
  const {
    selected,
    openModal,
    onClose,
    detailsLoading,
    fetchCuriosity,
    curiosity,
    curiosityLoading,
    fetchError,
  } = usePokemonModal(pokemonDetailsMap);

  return (
    <AnimatedReveal loading={loading}>
      <Nav />
      <div className="mx-auto p-6 font-sans bg-black/60">
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        <div className="flex gap-5 flex-wrap justify-center">
          {loading ? (
            <p className="col-span-full text-center">Cargando pokémon...</p>
          ) : (
            pokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.name}
                pokemon={pokemon}
                details={pokemonDetailsMap[pokemon.name]}
                onOpenModal={openModal}
              />
            ))
          )}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          goToPage={goToPage}
        />

        <PokemonModal
          selected={selected}
          onClose={onClose}
          detailsLoading={detailsLoading}
          fetchCuriosity={fetchCuriosity}
          curiosityLoading={curiosityLoading}
          curiosity={curiosity}
          fetchError={fetchError}
        />
      </div>
    </AnimatedReveal>
  );
}
