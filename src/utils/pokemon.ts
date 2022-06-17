import { EvolutionChain, Pokemon, PokemonSprites, Type } from 'pokenode-ts';

export const getAnimatedSprite = (sprites?: PokemonSprites) => {
  if (!sprites) return '';
  return (
    sprites.versions['generation-v']['black-white'].animated.front_default ||
    sprites.front_default ||
    ''
  );
};

export const toCustomizedPokemon = (pokemon: Pokemon): CustomizedPokemon => {
  const { id, name, sprites, types, abilities, stats, species, height, weight, base_experience } =
    pokemon;

  return {
    id,
    name,
    types,
    species,
    stats,
    abilities,
    weight,
    height,
    base_experience,
    sprites: {
      normal: sprites.other['official-artwork'].front_default || '',
      animated: getAnimatedSprite(sprites),
    },
  };
};

export const toCustomizedEvolution = (evolutionChain: EvolutionChain): CustomizedEvolChain => {
  const { id } = evolutionChain;
  return {
    id,
  };
};
export const toCustomizedType = (type: Type): CustomizedType => {
  const { name, damage_relations } = type;
  return {
    name,
    damage_relations: {
      weakness: damage_relations.double_damage_from.map(({ name }) => name),
    },
  };
};
