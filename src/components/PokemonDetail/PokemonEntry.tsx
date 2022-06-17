/** @jsxImportSource @emotion/react */
import { FlavorText, PokemonSpecies } from 'pokenode-ts';

interface PokemonEntryProps {
  species: PokemonSpecies | undefined;
}

const PokemonEntry = ({ species }: PokemonEntryProps) => {
  const randomFlavorText = (flavorTextEntries: FlavorText[] | undefined) => {
    if (!flavorTextEntries) return '';
    const max = flavorTextEntries.length;
    const randomIndex = Math.floor(Math.random() * (max + 1));
    return flavorTextEntries[randomIndex]?.flavor_text;
  };
  return (
    <div className="pokedex-entry ">
      <h2 className="pokemon-heading">Pokedex entry</h2>
      <div className="text-entry-desc">
        {randomFlavorText(
          species?.flavor_text_entries?.filter((flav) => flav.language.name === 'en')
        )}
      </div>
    </div>
  );
};

export default PokemonEntry;
