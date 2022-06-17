/** @jsxImportSource @emotion/react */
import { useAppDispatch } from 'app/hooks';
import { setCurrentPokemon } from 'app/pokemonSlice';
import tw from 'twin.macro';
import './pokemonCard.scss';

interface PokemonCardProps {
  pokemon: CustomizedPokemon;
}

const PokemonCard = (props: PokemonCardProps) => {
  const { pokemon } = props;

  const dispatch = useAppDispatch();

  const onGetCurrentPokemon = () => {
    dispatch(setCurrentPokemon(pokemon));
  };

  return (
    <div key={pokemon.name} className="pokemon-card" onClick={onGetCurrentPokemon}>
      <div className="image-wrapper">
        <img draggable={false} src={pokemon.sprites.animated} />
      </div>
      <div className="card-info flex flex-col items-center">
        <span css={tw`text-[#a3a9b2] text-sm font-bold `}>N&deg;{pokemon.id}</span>
        <h3 css={tw`capitalize font-bold text-lg py-2`}>{pokemon.name}</h3>
        <div className="type-container" css={tw`mb-4 flex flex-row gap-3`}>
          {pokemon.types?.map((type) => {
            return (
              <span
                key={type.slot}
                data-color={type.type.name}
                css={tw`uppercase font-bold text-[12px] lg:(text-sm px-4 py-2) px-2 py-1  rounded-md flex justify-center items-center shadow `}
              >
                {type.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
