/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

interface PokemonTypeProps {
  pokemon: CustomizedPokemon;
}

const PokemonType = (props: PokemonTypeProps) => {
  const { pokemon } = props;
  return (
    <div className="type-pokemon">
      {pokemon.types?.map((type) => {
        return (
          <span
            key={type.type.name}
            data-color={type.type.name}
            css={tw`uppercase font-bold text-sm px-4 py-2 rounded-md flex justify-center items-center shadow`}
          >
            {type.type.name}
          </span>
        );
      })}
    </div>
  );
};

export default PokemonType;
