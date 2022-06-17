/** @jsxImportSource @emotion/react */
import { useAppSelector } from 'app/hooks';
import { selectTypes } from 'app/pokemonSlice';
import tw from 'twin.macro';

interface PokemonInfoProps {
  pokemon: CustomizedPokemon;
}

const PokemonInfo = (props: PokemonInfoProps) => {
  const { pokemon } = props;
  const listType = useAppSelector(selectTypes);
  const weaknesses = [
    ...new Set(
      pokemon.types
        ?.map(({ type: { name } }) => {
          return listType.find((type) => type.name === name);
        })
        .reduce((acc, cur) => {
          acc.push(...(cur as CustomizedType).damage_relations.weakness);
          return acc;
        }, [] as string[])
    ),
  ];

  return (
    <div className="pokemon-info">
      <div className="wapper-pokemon-info">
        <h2 className="pokemon-heading" css={tw` mb-[20px] `}>
          Height
        </h2>
        <div className="wrapper-content">
          <p key={pokemon?.height}>{pokemon?.height / 10}m</p>
        </div>
      </div>
      <div className="wapper-pokemon-info">
        <h2 className="pokemon-heading" css={tw` mb-[20px] `}>
          Weight
        </h2>
        <div className="wrapper-content">
          <p key={pokemon?.weight}>{pokemon?.weight / 10}kg</p>
        </div>
      </div>
      <div className="wapper-pokemon-info">
        <h2 className="pokemon-heading" css={tw` mb-[20px] `}>
          Weaknesses
        </h2>
        <div className="wrapper-content">
          <ul css={tw`flex`}>
            <li css={tw`w-6 h-6 bg-fire rounded-full`}>x2</li>
            {weaknesses
              ?.sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((type) => (
                <li key={type} css={tw`w-6 h-6 `} data-image={type}></li>
              ))}
          </ul>
        </div>
      </div>
      <div className="wapper-pokemon-info">
        <h2 className="pokemon-heading" css={tw` mb-[20px] `}>
          Base exp
        </h2>
        <div className="wrapper-content">
          <p key={pokemon?.base_experience}>{pokemon?.base_experience}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;
