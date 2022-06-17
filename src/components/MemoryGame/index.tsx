/** @jsxImportSource @emotion/react */
// import tw from 'twin.macro';

import { useAppSelector } from 'app/hooks';
import { selectPokemons } from 'app/pokemonSlice';
import { useEffect, useState } from 'react';
import { deepClone } from 'utils/object';
import './memoryGame.scss';
import PokemonCard from './PokemonCard';

const MemoryGame = () => {
  const pokemons = useAppSelector(selectPokemons);
  const [prev, setPrev] = useState(-1);

  const [randomPokemons, setRandomPokemons] = useState<
    { image: string; id: number; stat: string }[]
  >([]);

  useEffect(() => {
    const ramdomPokemon = pokemons
      .map((poke) => ({ image: poke.sprites.normal, id: poke.id, stat: '' }))
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    const res = ramdomPokemon.concat(deepClone(ramdomPokemon)).sort(() => Math.random() - 0.5);
    setRandomPokemons(res);
  }, [pokemons]);

  function check(current: number) {
    if (randomPokemons[current].id === randomPokemons[prev].id) {
      randomPokemons[current].stat = 'correct';
      randomPokemons[prev].stat = 'correct';
      setRandomPokemons([...randomPokemons]);
      setPrev(-1);
    } else {
      randomPokemons[current].stat = 'wrong';
      randomPokemons[prev].stat = 'wrong';
      setRandomPokemons([...randomPokemons]);
      setTimeout(() => {
        randomPokemons[current].stat = '';
        randomPokemons[prev].stat = '';
        setRandomPokemons([...randomPokemons]);
        setPrev(-1);
      }, 1000);
    }
  }

  const handleClick = (id: number) => {
    if (prev === -1) {
      setRandomPokemons((pokemons) => {
        pokemons[id].stat = 'active';
        return [...pokemons];
      });
      setPrev(id);
    } else {
      check(id);
    }
  };

  return (
    <div className="container">
      {randomPokemons.map((item, index) => {
        return (
          <PokemonCard
            key={index}
            stat={item.stat}
            image={item.image}
            handleClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};

export default MemoryGame;
