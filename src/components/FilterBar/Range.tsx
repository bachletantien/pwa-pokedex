/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';

const Range = () => {
  return (
    <div className="filter-range" css={tw`flex gap-2`}>
      <div className="from-range">
        <span className="range-text" css={tw`font-bold text-sm text-[#081942]`}>
          from
        </span>
        <input
          type="text"
          css={tw`ml-4 bg-transparent w-full max-w-[80px] text-right rounded-lg border border-gray text-gray outline-none p-2`}
        />
      </div>
      <div className="to-range">
        <span className="range-text" css={tw`font-bold text-sm text-[#081942]`}>
          to
        </span>
        <input
          type="text"
          css={tw`ml-4 bg-transparent w-full max-w-[80px] text-right rounded-lg border border-gray text-gray outline-none p-2`}
        />
      </div>
    </div>
  );
};

export default Range;
