import { configureStore, combineReducers } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';
import hangGameReducer from './hangSlice';

const rootReducer = combineReducers({
  pokemons: pokemonReducer,
  hangGame: hangGameReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
