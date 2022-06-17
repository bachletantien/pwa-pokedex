/** @jsxImportSource @emotion/react */
import { selectGameStarted, selectNameLetters } from 'app/hangSlice';
import { useAppSelector } from 'app/hooks';
import tw from 'twin.macro';
import './PokemonName.scss';

const PokemonName = () => {
  const nameLetters = useAppSelector(selectNameLetters);
  const gameStarted = useAppSelector(selectGameStarted);

  return (
    <div
      css={tw`flex items-center h-[48px] max-w-[400px] justify-center mx-auto max-md:max-w-[350px]`}
    >
      {gameStarted ? (
        nameLetters.map((letter, index) => {
          return (
            <div className="letter-container" key={`${letter.id}-${index}`}>
              <p className={letter.classList.join(' ')} id={`${letter.id}-${index}`}>
                {letter.id}
              </p>
            </div>
          );
        })
      ) : (
        <p>Click to Start</p>
      )}
    </div>
  );
};

export default PokemonName;
