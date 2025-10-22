export default function Nav() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-red-500/90 backdrop-blur shadow-md">
      <div className="flex items-center space-x-3">
        <img
          src="/poke_data.png"
          alt="Logo de PokeApi AI"
          className="w-10 h-10"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          PokeApi AI
        </h1>
      </div>
    </nav>
  );
}
