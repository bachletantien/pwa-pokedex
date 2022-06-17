/** @jsxImportSource @emotion/react */
import {
  selectCurrentRandomPokemon,
  selectGameOver,
  selectGameStarted,
  setHangGameData,
  startGame,
} from 'app/hangSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import pokeBall from 'assets/images/pokeball.png';
import { PokemonClient } from 'pokenode-ts';
import tw from 'twin.macro';
import { toCustomizedPokemon } from 'utils/pokemon';

const Image = () => {
  const dispatch = useAppDispatch();
  const getRandomPokemon = async (randomNumber: number) => {
    const pokemonClient = new PokemonClient();

    const randomPokemon = await pokemonClient.getPokemonById(randomNumber);
    return randomPokemon;
  };
  const gameStarted = useAppSelector(selectGameStarted);
  const gameOver = useAppSelector(selectGameOver);

  const handleOnClick = async () => {
    const number = Math.floor(Math.random() * 800);

    const currentPokemon = toCustomizedPokemon(await getRandomPokemon(number));
    const nameLetters = currentPokemon.species.name.split('').map((letter) =>
      /[^a-z]/.test(letter)
        ? {
            id: letter,
            classList: ['name-letter', 'visible'],
          }
        : {
            id: letter,
            classList: ['name-letter'],
          }
    );
    const rightGuesses = currentPokemon.species.name
      .split('')
      .map((letter) => (/[^a-z]/.test(letter) ? letter : ''));
    // console.log(currentPokemon);
    // console.log(nameLetters);
    // console.log(rightGuesses);
    dispatch(setHangGameData({ currentPokemon, nameLetters, rightGuesses }));
    dispatch(startGame());
  };

  const checkGameValid = () => {
    return gameStarted === false && gameOver === false ? handleOnClick() : null;
  };

  const pokemonImage = useAppSelector(selectCurrentRandomPokemon).sprites?.normal;

  return (
    <div css={tw`flex items-center justify-center`}>
      <img
        draggable="false"
        src={pokemonImage === undefined ? pokeBall : pokemonImage}
        css={tw`h-[200px]`}
        onClick={checkGameValid}
        style={
          gameStarted === false && gameOver === false
            ? { cursor: 'pointer' }
            : { cursor: 'default' }
        }
      />
    </div>
  );
};

export default Image;
