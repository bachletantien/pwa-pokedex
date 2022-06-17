/** @jsxImportSource @emotion/react */
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectTypes, setFilter } from 'app/pokemonSlice';
import { ReactComponent as AngleDown } from 'assets/svgs/angle-down-solid.svg';
import { useRef, useState } from 'react';
import tw from 'twin.macro';
import './FilterButtons';

export interface FilterDropdownProps {
  label: string;
}

const FilterDropdown = (props: FilterDropdownProps) => {
  const listType = useAppSelector(selectTypes);
  const dispatch = useAppDispatch();

  const { label } = props;
  const [value, setValue] = useState(label);
  const [valueImage, setValueImage] = useState('normal');

  const dropdownListEL = useRef<HTMLUListElement>(null);

  const onToggleDropdown = () => {
    dropdownListEL.current?.classList.toggle('hidden');
    setValue(label);
    setValueImage('normal');
  };

  const onSelectedValue = (type: CustomizedType) => {
    setValue(type.name.toUpperCase());
    setValueImage(type.name);
    dropdownListEL.current?.classList.toggle('hidden');
    dispatch(setFilter({ filteredType: type.name }));
  };

  return (
    <div className="filter-dropdown" css={tw`relative`}>
      <div className="selected-item" onClick={onToggleDropdown}>
        <span css={tw`mr-2 w-6 h-6  `} data-image={valueImage}></span>

        <span className="selected-text text-sm ">{value}</span>
        <AngleDown css={tw`ml-8 max-w-[10px]`} fill="#8d8b90" />
      </div>
      <ul className="dropdown-list hidden" ref={dropdownListEL}>
        {listType.map((type) => {
          return (
            <li
              key={type.name + label}
              className="dropdown-item"
              css={tw`flex items-center gap-2 px-2 py-2`}
              onClick={() => onSelectedValue(type)}
            >
              <span css={tw`w-6 h-6 `} data-image={type.name}></span>
              <span
                css={tw`uppercase font-bold text-sm  rounded-md flex justify-center items-center`}
              >
                {type.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilterDropdown;
