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
      className="relative cursor-pointer backdrop-blur-md bg-white/60 rounded-xl border border-white/10 shadow-xl p-6 flex flex-col items-center text-center text-white w-72 hover:scale-105 transition-transform duration-300"
    >
      {details ? (
        <>
          <div className="w-full h-36 flex justify-center items-center bg-gray-600/30 rounded-lg mb-4">
            <img
              src={details.sprites.front_default}
              alt={pokemon.name}
              className="w-40 h-40 object-contain drop-shadow-lg"
            />
          </div>

          <h3 className="text-3xl font-bold mb-2 capitalize drop-shadow text-black">
            {details.name}
          </h3>

          <p className="text-sm text-black/70">
            <span className="font-bold">
              Tipo: {details.types.map((t: any) => t.type.name).join(", ")}
            </span>
          </p>

          <div className="absolute inset-0 rounded-xl ring-0 ring-white/0 group-hover:ring-2 group-hover:ring-blue-400 transition-all duration-300" />
        </>
      ) : (
        <p className="text-white/70">Cargando...</p>
      )}
    </div>
  );
}
