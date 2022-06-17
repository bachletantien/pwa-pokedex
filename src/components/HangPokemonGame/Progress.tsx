/** @jsxImportSource @emotion/react */
import { selectGameStarted, selectWrongGuessed } from 'app/hangSlice';
import { useAppSelector } from 'app/hooks';
import { useEffect, useRef } from 'react';
import tw from 'twin.macro';

const Progress = () => {
  const progressEL = useRef<HTMLDivElement>(null);
  const wrongGuesses = useAppSelector(selectWrongGuessed);
  const gameStarted = useAppSelector(selectGameStarted);
  const wrongCount = wrongGuesses.length;
  //   const setProgress = () => {
  //     const currentWidth = `${wrongCount * 10}+%`;
  //     progressEL.current?.style.setProperty('width', currentWidth);
  //   };
  useEffect(() => {
    const currentWidth = `${wrongCount * 10}%`;
    progressEL.current?.style.setProperty('width', currentWidth);

    if (wrongCount > 7) progressEL.current?.style.setProperty('background-color', '#EA2027');
    else progressEL.current?.style.setProperty('background-color', '#FFC312');
  }, [wrongCount]);
  return (
    <div>
      {gameStarted ? (
        <div
          css={tw`mb-5 flex rounded-2xl items-center justify-center mx-auto w-[90%] max-w-[700px] bg-[#ced6e0] relative h-10`}
        >
          <div
            ref={progressEL}
            className="progress"
            css={tw`duration-500 rounded-2xl flex items-center justify-center absolute top-0 left-0 bottom-0 `}
          >
            {wrongCount > 0 && wrongCount < 10 ? (
              <span css={tw`text-[#fff]`}>{10 - wrongCount} left! </span>
            ) : null}
            {wrongCount === 10 ? <span css={tw`text-[#fff]`}>Out of attemps !!! </span> : null}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Progress;
