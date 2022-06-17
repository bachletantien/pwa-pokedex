type CustomizedPokemon = Pick<
  import('pokenode-ts').Pokemon,
  | 'id'
  | 'name'
  | 'types'
  | 'abilities'
  | 'species'
  | 'stats'
  | 'base_experience'
  | 'height'
  | 'weight'
> & {
  /** A set of sprites used to depict this Pokémon in the game. */
  sprites: {
    /** The default depiction of this Pokémon from the front in battle */
    normal: string;
    /** The animated depiction of this Pokémon from the front in battle */
    animated: string;
  };
};

type CustomizedEvolChain = Pick<import('pokenode-ts').EvolutionChain, 'id'>;
type CustomizedType = Pick<import('pokenode-ts').Type, 'name'> & {
  damage_relations: {
    weakness: string[];
  };
};
