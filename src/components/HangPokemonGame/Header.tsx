/** @jsxImportSource @emotion/react */

import { selectHeaderText, selectLost, selectWon } from 'app/hangSlice';
import { useAppSelector } from 'app/hooks';
import tw from 'twin.macro';

const Header = () => {
  const won = useAppSelector(selectWon);
  const lost = useAppSelector(selectLost);
  const headerText = useAppSelector(selectHeaderText);

  return (
    <div css={tw`flex w-full justify-center py-10 items-center gap-10 max-md:gap-2`}>
      <div
        className="badge"
        css={tw`rounded-md px-4 py-2 flex items-center justify-center bg-[#2ed573] text-[#fff] max-md:px-2 max-md:py-1`}
      >
        Won: {won}
      </div>
      <div
        className="badge"
        css={tw`flex px-4 py-2 items-center justify-center font-bold max-md:px-2 max-md:py-1`}
      >
        {headerText}
      </div>
      <div
        className="badge"
        css={tw`rounded-md px-4 py-2 flex items-center justify-center bg-[#EA2027] text-[#fff] max-md:px-2 max-md:py-1`}
      >
        Lost: {lost}
      </div>
    </div>
  );
};

export default Header;
