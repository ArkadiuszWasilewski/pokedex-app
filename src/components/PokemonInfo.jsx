import PokemonInfoTable from "./PokemonInfoTable";

const PokemonInfo = ({ pokemonInfo }) => {
  const typeColors = {
    fire: "#f97316",
    water: "#38bdf8",
    grass: "#65a30d",
    normal: "#eff6ff",
    flying: "#fed7aa",
    poison: "#bef264",
    electric: "#fde047",
    ground: "#fde68a",
    rock: "#44403c",
    psychic: "#ec4899",
    ice: "#67e8f9",
    bug: "#84cc16",
    ghost: "#312e81",
    steel: "#a1a1aa",
    dragon: "#5b21b6",
    dark: "#111827",
    fairy: "#ec4899",
    fighting: "#ef4444",
    default: "grey",
  };
  const backgroundColorClass = pokemonInfo
    ? typeColors[pokemonInfo.types[0].type.name]
    : typeColors.default;
  return pokemonInfo ? (
    <div
      className="min-w-[200px] max-h-[550px] rounded-[25px] mx-2 my-2 text-xs px-2 py-2"
      style={{
        backgroundImage: `linear-gradient(120deg, ${backgroundColorClass}, transparent)`,
      }}
    >
      <img
        src={pokemonInfo.sprites.other["official-artwork"].front_default}
        alt={`${pokemonInfo.name} front default sprite`}
        className="w-[100px]"
      />
      <h2 className="capitalize font-bold">{pokemonInfo.name}</h2>
      <p>ID: {pokemonInfo.id}</p>
      <p>Weight: {pokemonInfo.weight}</p>
      <p>Height: {pokemonInfo.height}</p>
      <div>
        Types:
        {pokemonInfo.types.map((type) => (
          <span key={type.type.name}> {type.type.name} </span>
        ))}
      </div>
      <PokemonInfoTable stats={pokemonInfo.stats} />
    </div>
  ) : (
    <p>Pokémon not found!</p>
  );
};

export default PokemonInfo;
