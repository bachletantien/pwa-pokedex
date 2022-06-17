/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import { ReactComponent as AngleDown } from 'assets/svgs/angle-down-solid.svg';
import './Dropdown.scss';
import { useRef, useState } from 'react';

const Dropdown = () => {
  const [text, setText] = useState('Ascending');

  const dropdownListEL = useRef<HTMLUListElement>(null);

  const list = [
    {
      text: 'Ascending',
    },
    {
      text: 'Descending',
    },
  ];

  const onToggleDropdown = () => {
    dropdownListEL.current?.classList.toggle('hidden');
  };

  const onChange = (value: string) => {
    setText(value);
    dropdownListEL.current?.classList.toggle('hidden');
  };

  return (
    <div
      className="dropdown"
      css={tw`relative w-full max-w-[100px] text-sm font-bold text-[#081942]`}
    >
      <div
        className="selected"
        onClick={onToggleDropdown}
        css={tw`cursor-pointer flex justify-between items-center`}
      >
        <span className="selected-text ">{text}</span>
        <AngleDown css={tw`max-w-[14px] fill-[#081942]`} />
      </div>
      <ul
        className="dropdown-list hidden"
        ref={dropdownListEL}
        css={tw`rounded-md absolute z-20 flex-col w-full bg-[#fff] shadow-md font-normal`}
      >
        {list.map((item) => {
          return (
            <li key={item.text} className="dropdown-item" onClick={() => onChange(item.text)}>
              {item.text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Dropdown;
