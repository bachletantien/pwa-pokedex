/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import './FilterButtons.scss';
import FilterDropdown from './FilterDropdown';

const FilterButtons = () => {
  return (
    <div css={tw`w-full flex flex-col  lg:(flex-row items-center) gap-2`}>
      <FilterDropdown label="Types" />
      <FilterDropdown label="Weaknesses" />
    </div>
  );
};

export default FilterButtons;
