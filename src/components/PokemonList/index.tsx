/** @jsxImportSource @emotion/react */
import { useAppSelector } from 'app/hooks';
import { selectFilter, selectPokemons } from 'app/pokemonSlice';
import LoadButton from 'components/LoadButton';
import PokemonCard from 'components/PokemonCard';
import Fuse from 'fuse.js';
import { useMemo } from 'react';
import tw from 'twin.macro';

export interface PokemonListProps {
  pokemons: CustomizedPokemon[];
}

const PokemonList = () => {
  const pokemons = useAppSelector(selectPokemons);
  const filter = useAppSelector(selectFilter);
  const options = { keys: ['name', 'types.type.name'] };

  const fuse = useMemo(() => new Fuse(pokemons, options), [pokemons]);
  const filteredPokemons = useMemo(() => {
    if (!filter.filteredType) return pokemons;
    return fuse.search(`'${filter.searchString} '=${filter.filteredType}`).map(({ item }) => item);
  }, [pokemons, filter.searchString, filter.filteredType]);

  return (
    <div css={tw`col-span-8 `}>
      <div css={tw`grid lg:grid-cols-3  gap-5 grid-cols-2`}>
        {filteredPokemons.map((pokemon) => {
          return (
            <div key={pokemon.name}>
              <PokemonCard pokemon={pokemon} />
            </div>
          );
        })}
      </div>
      <LoadButton />
    </div>
  );
};

export default PokemonList;
