/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import { ReactComponent as AngleDown } from 'assets/svgs/angle-down-solid.svg';
import { useRef } from 'react';
import { useAppSelector } from 'app/hooks';
import { selectAbilities } from 'app/pokemonSlice';

const AbilityDropdown = () => {
  const onToggleDropdown = () => {
    dropdownListEL.current?.classList.toggle('hidden');
  };
  const dropdownListEL = useRef<HTMLUListElement>(null);
  const listAbilities = useAppSelector(selectAbilities);

  return (
    <div className="filter-dropdown" css={tw`relative`}>
      <div className="selected-item" onClick={onToggleDropdown}>
        <span className="selected-text text-sm ">Ability</span>
        <AngleDown css={tw`ml-8 max-w-[10px]`} fill="#8d8b90" />
      </div>
      <ul className="dropdown-list hidden" ref={dropdownListEL}>
        {listAbilities.map((type) => {
          return (
            <li className="dropdown-item" css={tw`flex items-center gap-2 px-2 py-2`}>
              <span key={type.name} css={tw`w-6 h-6 `} data-image={type.name}></span>
              <span
                key={type.name}
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

export default AbilityDropdown;
