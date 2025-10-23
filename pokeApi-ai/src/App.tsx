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
    goToPage,
  } = usePagination(24);

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
      <div className="flex flex-col min-h-screen bg-gray-400">
        {/* Nav */}
        <header className="w-full z-50">
          <Nav />
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 mx-auto p-4 w-full">
          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

          <div className="flex flex-wrap justify-center gap-5">
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

          {/* MODAL */}
          <PokemonModal
            selected={selected}
            onClose={onClose}
            detailsLoading={detailsLoading}
            fetchCuriosity={fetchCuriosity}
            curiosityLoading={curiosityLoading}
            curiosity={curiosity}
            fetchError={fetchError}
          />
        </main>

        <footer className="w-full py-4 backdrop-blur-xs bg-red-400/60 shadow-md">
          <Pagination
            page={page}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            goToPage={goToPage}
          />
        </footer>
      </div>
    </AnimatedReveal>
  );
}
