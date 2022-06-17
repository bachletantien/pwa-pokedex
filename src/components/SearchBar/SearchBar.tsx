/** @jsxImportSource @emotion/react */
import { useAppDispatch } from 'app/hooks';
import { setFilter } from 'app/pokemonSlice';
import { ReactComponent as PokeballFill } from 'assets/svgs/pokeball-fill.svg';
import { ChangeEvent } from 'react';
import tw from 'twin.macro';
import './searchbar.scss';

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch(setFilter({ searchString: value }));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        onChange={(e) => {
          handleFilter(e);
        }}
        placeholder="Search your Pokemon!"
      />
      <div className="search-btn">
        <PokeballFill className="image" css={tw` `} />
      </div>
    </div>
  );
};

export default SearchBar;
