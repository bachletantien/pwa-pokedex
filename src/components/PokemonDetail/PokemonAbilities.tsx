/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

interface PokemonAbilityProps {
  pokemon: CustomizedPokemon;
  title: string;
}

const PokemonAbility = ({ pokemon, title }: PokemonAbilityProps) => {
  return (
    <div className="pokedex-abilities ">
      <h2 className="pokemon-heading" css={tw` mb-[20px] `}>
        {title}
      </h2>
      <div css={tw`flex justify-center items-center gap-4 text-[16px] font-normal`}>
        {pokemon.abilities?.map((abi) => {
          return (
            <span
              key={abi.ability.name}
              css={tw`bg-[#f5f7fc]  border border-black px-8 py-2 rounded-2xl`}
            >
              {abi.ability.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonAbility;
