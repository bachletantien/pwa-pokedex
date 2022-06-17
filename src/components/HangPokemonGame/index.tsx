/** @jsxImportSource @emotion/react */
import Header from './Header';
import Image from './Image';
import Letters from './Letters';
import PokemonName from './PokemonName';
import Progress from './Progress';
import Reset from './Reset';

const HangPokemonGame = () => {
  return (
    <div>
      <Header />
      <Image />
      <PokemonName />
      <Letters />
      <Progress />
      <Reset />
    </div>
  );
};

export default HangPokemonGame;
