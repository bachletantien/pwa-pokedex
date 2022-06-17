import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { Ability, EvolutionChain, EvolutionClient, PokemonClient } from 'pokenode-ts';
import { toCustomizedPokemon, toCustomizedType } from './../utils/pokemon';

type PokemonFilter = {
  searchString?: string;
  filteredType?: string;
};

interface PokemonState {
  list: CustomizedPokemon[];
  currentPokemon: CustomizedPokemon;
  types: CustomizedType[];
  abilities: Ability[];
  evols: EvolutionChain[];
  filter: PokemonFilter;
}

const initialState: PokemonState = {
  list: [],
  currentPokemon: {} as CustomizedPokemon,
  types: [],
  abilities: [],
  evols: [],
  filter: { searchString: '', filteredType: '' },
};

const pokemonClient = new PokemonClient();
const evolutionChainClient = new EvolutionClient();

export const fetchPokemons = createAsyncThunk<
  CustomizedPokemon[],
  { offset?: number; limit?: number }
>('pokemons/fetchPokemons', async ({ offset, limit }) => {
  const res = await pokemonClient.listPokemons(offset, limit);
  const _pokemons = await Promise.all(
    res.results.map(async ({ name }) => pokemonClient.getPokemonByName(name))
  );
  const pokemons = _pokemons.map(toCustomizedPokemon);
  return pokemons;
});

export const fetchTypes = createAsyncThunk<CustomizedType[]>('pokemons/fetchTypes', async () => {
  const res = await pokemonClient.listTypes();

  const _types = await Promise.all(
    res.results.map(async ({ name }) => pokemonClient.getTypeByName(name))
  );
  const types = _types.map(toCustomizedType);
  return types;
});
export const fetchAbilities = createAsyncThunk<Ability[]>('pokemons/fetchAbilities', async () => {
  const res = await pokemonClient.listAbilities();

  const abilities = await Promise.all(
    res.results.map(async ({ name }) => pokemonClient.getAbilityByName(name))
  );
  return abilities;
});
export const fetchEvolutionChain = createAsyncThunk<
  EvolutionChain[],
  { offset?: number; limit?: number }
>('pokemons/fetchEvolutionChain', async ({ offset, limit }) => {
  const res = await evolutionChainClient.listEvolutionChains(offset, limit);
  const regex = /[^a-z]\d+/;
  const evol = await Promise.all(
    res.results.map(async ({ url }) => {
      const id = url.match(regex)?.[0].slice(1);
      return evolutionChainClient.getEvolutionChainById(id as unknown as number);
    })
  );
  return evol;
});

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setCurrentPokemon: (state, action: PayloadAction<CustomizedPokemon>) => {
      state.currentPokemon = action.payload;
    },
    setFilter: (state, action: PayloadAction<PokemonFilter>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.list.push(...action.payload);
    });
    builder.addCase(fetchTypes.fulfilled, (state, action) => {
      state.types = action.payload;
    });
    builder.addCase(fetchAbilities.fulfilled, (state, action) => {
      state.abilities = action.payload;
    });
    builder.addCase(fetchEvolutionChain.fulfilled, (state, action) => {
      state.evols = action.payload;
    });
  },
});

export const { setCurrentPokemon, setFilter } = pokemonSlice.actions;

export const selectPokemons = (state: RootState) => state.pokemons.list;

export const selectTypes = (state: RootState) => state.pokemons.types;
export const selectFilter = (state: RootState) => state.pokemons.filter;

export const selectAbilities = (state: RootState) => state.pokemons.abilities;
export const selectEvolution = (state: RootState) => state.pokemons.evols;

export const selectCurrentPokemon = (state: RootState) => state.pokemons.currentPokemon;

export default pokemonSlice.reducer;
