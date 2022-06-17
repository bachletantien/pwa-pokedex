/** @jsxImportSource @emotion/react */
import FilterBar from 'components/FilterBar';
import PokemonDetail from 'components/PokemonDetail';
import PokemonList from 'components/PokemonList';
import SearchBar from 'components/SearchBar/SearchBar';
import tw from 'twin.macro';

const Home = () => {
  return (
    <div css={tw`mx-auto  max-w-[90%] relative`}>
      <div css={tw`grid lg:grid-cols-12 `}>
        <div css={tw`lg:col-span-8`}>
          <SearchBar />
          <FilterBar />
        </div>
      </div>

      <div css={tw`lg:(grid grid-cols-12 gap-x-[20px]) grid grid-cols-1`}>
        <PokemonList />
        <PokemonDetail />
      </div>
    </div>
  );
};

export default Home;
