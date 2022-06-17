/** @jsxImportSource @emotion/react */
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCurrentPokemon, selectPokemons, setCurrentPokemon } from 'app/pokemonSlice';
import tw from 'twin.macro';

// interface PokemonPaginationProps {}

const PokemonPagination = () => {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectPokemons);
  const pokemon = useAppSelector(selectCurrentPokemon);
  const prevPokemon = pokemons.find((p) => p.id === pokemon.id - 1);
  const nextPokemon = pokemons.find((p) => p.id === pokemon.id + 1);

  const onSetCurrentPokemon = (pokemon: CustomizedPokemon) => {
    dispatch(setCurrentPokemon(pokemon));
  };

  return (
    <div
      className="pokemon-pagination "
      css={tw`h-5 w-full flex gap-2 justify-center items-center py-8 rounded-[15px] bg-gray/20`}
    >
      {prevPokemon && (
        <div onClick={() => onSetCurrentPokemon(prevPokemon)} className="prevPokemon">
          <img draggable={false} src={prevPokemon.sprites.animated} />
          <p>{prevPokemon.name}</p>
          <p css={tw`text-black font-light`}>#{prevPokemon.id}</p>
        </div>
      )}
      {nextPokemon && (
        <div onClick={() => onSetCurrentPokemon(nextPokemon)} className="nextPokemon">
          <p css={tw`text-black font-light`}>#{nextPokemon.id}</p>
          <p>{nextPokemon.name}</p>
          <img draggable={false} src={nextPokemon.sprites.animated} />
        </div>
      )}
    </div>
  );
};

export default PokemonPagination;
