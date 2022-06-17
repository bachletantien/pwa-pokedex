/** @jsxImportSource @emotion/react */
import { useAppDispatch } from 'app/hooks';
import { fetchAbilities, fetchEvolutionChain, fetchPokemons, fetchTypes } from 'app/pokemonSlice';
import 'assets/styles/App.scss';
import HangPokemonGame from 'components/HangPokemonGame';
import Home from 'components/Home';
import MemoryGame from 'components/MemoryGame';
import NavBar from 'components/NavBar';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import tw from 'twin.macro';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemons({}));
    dispatch(fetchTypes());
    dispatch(fetchAbilities());
    dispatch(fetchEvolutionChain({ limit: 250 }));
  }, []);

  return (
    <Router>
      <div className="App" css={tw`bg-[#f4f6fc] pt-5`}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory-game" element={<MemoryGame />} />
          <Route path="/hang-pokemon" element={<HangPokemonGame />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
