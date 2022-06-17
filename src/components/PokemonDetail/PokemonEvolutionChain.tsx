/** @jsxImportSource @emotion/react */
import { useAppSelector } from 'app/hooks';
import { selectCurrentPokemon, selectEvolution, selectPokemons } from 'app/pokemonSlice';
import { ChainLink, PokemonClient } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import tw from 'twin.macro';

interface PokemonEvolutionChainProps {
  title: string;
}

type SimplifiedEvolutionChain = {
  name: string;
  minLevel: number;
};

const PokemonEvolutionChain = (props: PokemonEvolutionChainProps) => {
  const evols = useAppSelector(selectEvolution);
  const pokemon = useAppSelector(selectCurrentPokemon);
  const pokemons = useAppSelector(selectPokemons);
  const { title } = props;
  const pokemonClient = new PokemonClient();
  const [pokemonEvol, setPokemonEvol] = useState<{ sprites: string; minLevel: number }[]>();

  const evolutionChainSimplify = (
    evolChain: ChainLink,
    chains: SimplifiedEvolutionChain[] = []
  ): SimplifiedEvolutionChain[] => {
    if (evolChain?.evolves_to[0]) {
      const _chains: SimplifiedEvolutionChain[] = [
        ...chains,
        {
          name: evolChain?.species.name,
          minLevel: (evolChain as any)?.evolution_details?.[0]?.min_level || 0,
        },
      ];
      return evolutionChainSimplify(evolChain?.evolves_to[0], _chains);
    }
    return [
      ...chains,
      {
        name: evolChain?.species.name,
        minLevel: (evolChain as any)?.evolution_details?.[0]?.min_level || 0,
      },
    ];
  };

  useEffect(() => {
    (async () => {
      const res = await pokemonClient.getPokemonSpeciesByName(pokemon?.name || '');
      const regex = /[^a-z]\d+/;
      const pokemonEvolCurrent = evols.find(
        (evol) => evol.id.toString() === res.evolution_chain?.url.match(regex)?.[0].slice(1)
      );

      const listCurrentPokemon = evolutionChainSimplify(pokemonEvolCurrent?.chain as ChainLink);
      const listCurrentPokemonEvolution = (
        pokemons.filter((poke) => {
          return listCurrentPokemon.map(({ name }) => name).includes(poke.name);
        }) as CustomizedPokemon[]
      ).map(({ sprites }, index) => ({
        sprites: sprites.normal || '',
        minLevel: listCurrentPokemon[index].minLevel,
      }));
      setPokemonEvol(listCurrentPokemonEvolution);
    })();
  }, [pokemon.name]);

  return (
    <div className="pokemon-evolution">
      <h2 className="pokemon-heading" css={tw`mb-[20px]`}>
        {title}
      </h2>
      <div css={tw`flex justify-center`}>
        {pokemonEvol?.map((poke) => {
          return (
            <div css={tw` text-[13px] flex items-center justify-center`} key={poke.sprites}>
              {poke.minLevel !== 0 && <span>lvl {poke.minLevel}</span>}
              <img css={tw`w-16`} src={poke.sprites} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonEvolutionChain;
