import Modal from "react-modal";
import type { PokemonDetails } from "../types/pokemon";

type Props = {
  selected: PokemonDetails | null;
  onClose: () => void;
  detailsLoading: boolean;
  fetchCuriosity: () => Promise<void>;
  curiosityLoading: boolean;
  curiosity: string | null;
  fetchError: string | null;
};

Modal.setAppElement("#root");

export default function PokemonModal({
  selected,
  onClose,
  detailsLoading,
  fetchCuriosity,
  curiosityLoading,
  curiosity,
  fetchError,
}: Props) {
  return (
    <Modal
      isOpen={!!selected}
      onRequestClose={onClose}
      className="bg-white rounded-lg max-w-3xl w-full p-6 outline-none relative shadow-lg flex flex-col md:flex-row gap-6"
      overlayClassName="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      {detailsLoading ? (
        <p className="text-center text-gray-700 w-full">Cargando detalles...</p>
      ) : selected ? (
        <>
          <div className="flex gap-10 items-center">
            <button
              onClick={fetchCuriosity}
              disabled={curiosityLoading}
              className="bg-red-600/80 text-white rounded px-6 py-2 hover:bg-red-700 transition-colors w-full max-w-2xs mb-2 cursor-pointer"
            >
              {curiosityLoading
                ? "Buscando dato curioso..."
                : "Ver dato curioso"}
            </button>

            {curiosity && (
              <div className="bg-indigo-100 text-red-900 rounded p-4 mt-2 max-h-36 overflow-y-auto w-full max-w-lg text-center md:text-left">
                <p>{curiosity}</p>
              </div>
            )}

            {fetchError && <p className="text-red-600 mt-4">{fetchError}</p>}
          </div>
        </>
      ) : null}
    </Modal>
  );
}
