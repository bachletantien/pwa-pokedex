/** @jsxImportSource @emotion/react */
import { useAppSelector } from 'app/hooks';
import { selectCurrentPokemon } from 'app/pokemonSlice';
import { ReactComponent as Female } from 'assets/svgs/female.svg';
import { ReactComponent as Male } from 'assets/svgs/male.svg';
import { Genus, PokemonClient, PokemonSpecies } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import tw from 'twin.macro';
import PokemonAbility from './PokemonAbilities';
import './pokemonDetail.scss';
import PokemonEntry from './PokemonEntry';
import PokemonEvolutionChain from './PokemonEvolutionChain';
import PokemonInfo from './PokemonInfo';
import PokemonPagination from './PokemonPagination';
import PokemonStat from './PokemonStat';
import PokemonType from './PokemonType';

const PokemonDetail = () => {
  const pokemon = useAppSelector(selectCurrentPokemon);

  const pokemonClient = new PokemonClient();
  const [species, setSpecies] = useState<PokemonSpecies>();

  useEffect(() => {
    (async () => {
      const res = await pokemonClient.getPokemonSpeciesByName(pokemon?.name || '');
      setSpecies(res);
    })();
  }, [pokemon.name]);

  const getGenus = (genusEntries: Genus[] | undefined) => {
    if (!genusEntries) return '';
    return genusEntries.map((genus) => {
      return genus.genus;
    });
  };

  return (
    <div className="pokemon-detail-container">
      <div className="img-pokemon-detail">
        <img
          css={tw`w-full min-w-[100px] lg:(min-w-[120px]) `}
          src={pokemon.sprites?.normal}
          alt=""
        />
      </div>
      <div className="pokemon-gender">
        <div css={tw`bg-[#85ddff] border-[#85ddff] border rounded-[10px] outline-none`}>
          <Male className="pokemon-gender-item" css={tw`text-[#1d4565]`} />
        </div>
        <div css={tw`border border-fire rounded-[10px] outline-none`}>
          <Female className="pokemon-gender-item" css={tw`text-fire`} />
        </div>
      </div>
      <div className="pokemon-detail-content">
        <div css={tw` font-semibold`}>
          <span css={tw`text-steel`}>#{pokemon?.id}</span>
          <h2 css={tw`text-black text-[25px] font-semibold`}>{pokemon?.name}</h2>
        </div>
        <PokemonType pokemon={pokemon} />
        <div className="genux-pokemon">
          {getGenus(species?.genera?.filter((gener) => gener.language.name === 'en'))}
        </div>
        <PokemonEntry species={species} />
        <PokemonAbility pokemon={pokemon} title="abilities" />
        <PokemonInfo pokemon={pokemon} />
        <PokemonStat title="Stats" pokemon={pokemon} />
        <PokemonEvolutionChain title="evolution" />
        <PokemonPagination />
      </div>
    </div>
  );
};

export default PokemonDetail;
