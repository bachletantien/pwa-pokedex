/** @jsxImportSource @emotion/react */
import { useAppDispatch } from 'app/hooks';
import { fetchPokemons } from 'app/pokemonSlice';
import { useState } from 'react';
import tw from 'twin.macro';

const LoadButton = () => {
  const dispatch = useAppDispatch();
  const [offset, setOffset] = useState(20);

  const onLoadMore = () => {
    dispatch(fetchPokemons({ offset }));
    setOffset(offset + 20);
  };
  return (
    <div
      onClick={onLoadMore}
      css={tw`text-[#fff] cursor-pointer max-w-[fit-content] my-[20px]  bg-blue-light text-center px-4 py-2 rounded-md `}
    >
      Load more
    </div>
  );
};

export default LoadButton;
