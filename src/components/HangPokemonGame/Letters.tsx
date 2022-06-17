/** @jsxImportSource @emotion/react */
import {
  addLose,
  addRightGuess,
  addWin,
  addWrongGuess,
  endGame,
  NameLetter,
  selectCurrentRandomPokemon,
  selectGameOver,
  selectGameStarted,
  selectLetters,
  selectNameLetters,
  selectRightGuessed,
  selectWrongGuessed,
  updateLetters,
  updateNameLetters,
} from 'app/hangSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { MouseEventHandler } from 'react';
import tw from 'twin.macro';
import './Letters.scss';

const Letters = () => {
  //   const initialLetters = alphabetArray.map((letter) => ({
  //     name: letter,
  //     style: 'outline-dark',
  //   }));

  const dispatch = useAppDispatch();
  const nameLetters = useAppSelector(selectNameLetters);
  const letters = useAppSelector(selectLetters);
  const pokemonName = useAppSelector(selectCurrentRandomPokemon).species?.name.split('');
  const rightGuesses = useAppSelector(selectRightGuessed);
  const wrongGuesses = useAppSelector(selectWrongGuessed);
  const gameOver = useAppSelector(selectGameOver);
  const gameStarted = useAppSelector(selectGameStarted);

  // make correct letters visible
  const showLetters = (guess: string) => {
    const updatedName = nameLetters.map((letter) => {
      if (letter.id === guess) {
        return {
          ...letter,
          classList: [...letter.classList, 'visible'],
        };
      }
      return letter;
    });
    dispatch(updateNameLetters({ updatedName }));
  };
  // check if guess is right or wrong
  const handleGuess: MouseEventHandler<HTMLDivElement> = (e) => {
    const currentTarget = e.target as HTMLDivElement;
    const guessedLetter = currentTarget.id;
    let updatedLetters = [];

    if (!pokemonName?.includes(guessedLetter)) {
      // turn button red if incorrect
      updatedLetters = letters.map((letter) => {
        if (letter.name === guessedLetter) {
          return { ...letter, style: 'wrong' };
        }
        return letter;
      });
      checkGameLost([...wrongGuesses]);
      dispatch(addWrongGuess({ guessedLetter }));
    } else {
      // turn button green if correct
      updatedLetters = letters.map((letter) => {
        if (letter.name === guessedLetter) {
          return { ...letter, style: 'right' };
        }
        return letter;
      });
      showLetters(guessedLetter);
      checkGameWon([...(rightGuesses + guessedLetter)]);
      dispatch(addRightGuess({ guessedLetter }));
    }
    dispatch(updateLetters({ updatedLetters }));
  };

  // check if all letters have been guessed
  const checkGameWon = (arr: string[]) => {
    if (pokemonName.every((letter) => arr.includes(letter))) {
      dispatch(addWin());
      dispatch(endGame());
    }
  };
  // check if 10 wrong letters have been guessed
  const checkGameLost = (arr: string[]) => {
    if (arr.length + 1 === 10) {
      dispatch(addLose());
      dispatch(endGame());
      const updatedName = nameLetters.map((letter) => {
        return {
          ...letter,
          classList: [...letter.classList, 'visible'],
        };
      }) as NameLetter[];
      dispatch(updateNameLetters({ updatedName }));
    }
  };

  return (
    <div
      css={tw`flex items-center flex-wrap w-[800px] mx-auto mt-10 pb-10 justify-center px-10 gap-3 max-md:w-[375px] max-md:px-0 `}
    >
      {letters.map((letter) => {
        return (
          <div
            id={letter.name}
            key={letter.name}
            className={
              gameOver === false && gameStarted === true ? letter.style : 'disabled-letter'
            }
            css={tw`select-none border transition-all duration-150 ease-in-out rounded-2xl cursor-pointer flex items-center justify-center w-10 h-10`}
            onClick={gameOver === false && gameStarted === true ? handleGuess : undefined}
          >
            {letter.name}
          </div>
        );
      })}
    </div>
  );
};

export default Letters;
