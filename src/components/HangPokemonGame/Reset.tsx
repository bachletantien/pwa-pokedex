/** @jsxImportSource @emotion/react */
import { reset } from 'app/hangSlice';
import { useAppDispatch } from 'app/hooks';
import tw from 'twin.macro';

const Reset = () => {
  const dispatch = useAppDispatch();
  const handleOnReset = () => {
    dispatch(reset());
  };
  return (
    <div css={tw`flex justify-center items-center`}>
      <div
        onClick={handleOnReset}
        css={tw`rounded-lg px-2 py-2 bg-[#2980b9] mx-auto w-[80px] inline-block text-center mb-16 text-[#fff] hover:bg-[#70a1ff] select-none cursor-pointer`}
      >
        Reset
      </div>
    </div>
  );
};

export default Reset;
