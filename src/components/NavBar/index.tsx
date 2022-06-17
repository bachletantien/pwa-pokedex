/** @jsxImportSource @emotion/react */
import { MouseEventHandler, useRef } from 'react';
import { Link } from 'react-router-dom';
import tw from 'twin.macro';
import './NavBar.scss';

const NavBar = () => {
  const navItems = [
    {
      title: 'Pokedex',
      link: '/',
    },
    {
      title: 'Pokemon memmory game',
      link: '/memory-game',
    },
    {
      title: `What's that pokemon ?`,
      link: '/hang-pokemon',
    },
  ];

  const navbarContainerEL = useRef<HTMLDivElement>(null);

  const toggleActiveNav: MouseEventHandler<HTMLDivElement> = (e?) => {
    const element = e?.target as HTMLDivElement;
    removeCurrentActiveNav();
    element.classList.add('active');
  };

  const removeCurrentActiveNav = () => {
    const arr = [].slice.call(navbarContainerEL.current?.children);
    arr.forEach((item: HTMLElement) => {
      item.children.item(0)?.classList.remove('active');
    });
  };

  return (
    <div
      ref={navbarContainerEL}
      css={tw`bg-[#fff] shadow-md px-3 relative  gap-4 text-center  mx-6  rounded-2xl flex lg:(max-w-[75%]  mx-auto px-6)`}
    >
      {navItems.map(({ link, title }) => {
        return (
          <Link to={link} key={title}>
            <div className="nav-link" onClick={(event) => toggleActiveNav(event)}>
              {title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NavBar;
