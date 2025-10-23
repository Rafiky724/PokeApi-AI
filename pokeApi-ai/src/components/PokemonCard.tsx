import type { PokemonBasic, PokemonDetails } from "../types/pokemon";

type Props = {
  pokemon: PokemonBasic;
  details?: PokemonDetails;
  onOpenModal: (pokemon: PokemonBasic) => void;
};

export default function PokemonCard({ pokemon, details, onOpenModal }: Props) {
  return (
    <div
      onClick={() => onOpenModal(pokemon)}
      className="relative cursor-pointer backdrop-blur-xs bg-white/60 rounded-xl border border-white/10 shadow-xl p-4 flex flex-col items-center text-center text-white w-72 hover:scale-105 transition-transform duration-300"
    >
      {details ? (
        <>
          <h3 className="text-3xl font-bold capitalize drop-shadow text-black">
            {details.name}
          </h3>
        </>
      ) : (
        <p className="text-white/70">Cargando...</p>
      )}
    </div>
  );
}
