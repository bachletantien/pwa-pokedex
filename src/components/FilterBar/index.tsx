/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import Dropdown from './Dropdown';
import FilterButtons from './FilterButtons';
import Range from './Range';

const FilterBar = () => {
  return (
    <div>
      <div
        className="container-top"
        css={tw` flex flex-col gap-4 mb-6 lg:(w-full flex-row justify-between)`}
      >
        <Dropdown />
        <Range />
      </div>
      <FilterButtons />
    </div>
  );
};

export default FilterBar;
