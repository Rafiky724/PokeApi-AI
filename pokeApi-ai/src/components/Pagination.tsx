type Props = {
  page: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  prevPage,
  nextPage,
  goToPage,
}: Props) {
  const visiblePagesCount = 5; // cuántas páginas mostrar centradas alrededor de la actual

  // Helper para crear rango de números
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  let visiblePages: (number | "dots")[] = [];

  if (totalPages <= visiblePagesCount + 2) {
    // Si pocas páginas, mostrar todas sin puntos
    visiblePages = range(0, totalPages - 1);
  } else {
    // Mostrar siempre la primera página
    visiblePages.push(0);

    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages - 2, page + 2);

    // Ajustar si estamos cerca del inicio
    if (page <= 3) {
      startPage = 1;
      endPage = visiblePagesCount;
    }

    // Ajustar si estamos cerca del final
    if (page >= totalPages - 4) {
      startPage = totalPages - 1 - visiblePagesCount;
      endPage = totalPages - 2;
    }

    // Agregar puntos suspensivos si hay espacio entre 1 y startPage
    if (startPage > 1) {
      visiblePages.push("dots");
    }

    // Agregar páginas centrales
    visiblePages = visiblePages.concat(range(startPage, endPage));

    // Agregar puntos suspensivos si hay espacio entre endPage y última página
    if (endPage < totalPages - 2) {
      visiblePages.push("dots");
    }

    // Mostrar última página siempre
    visiblePages.push(totalPages - 1);
  }

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <button
        onClick={prevPage}
        disabled={page === 0}
        className={`px-3 py-1 rounded ${
          page === 0
            ? "bg-red-600 text-white cursor-not-allowed"
            : "bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
        }`}
      >
        Anterior
      </button>

      {visiblePages.map((p, i) =>
        p === "dots" ? (
          <span key={`dots-${i}`} className="px-2 select-none text-red-500">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`px-3 py-1 rounded ${
              p === page
                ? "bg-red-950 text-white font-bold"
                : "bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
            }`}
          >
            {p + 1}
          </button>
        )
      )}

      <button
        onClick={nextPage}
        disabled={page + 1 === totalPages}
        className={`px-3 py-1 rounded ${
          page + 1 === totalPages
            ? "hidden"
            : "bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}
