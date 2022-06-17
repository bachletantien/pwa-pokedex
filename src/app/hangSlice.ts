import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export const alphabetArray = Array(26)
  .fill(0)
  .map((_, index) => String.fromCharCode(97 + index));

interface Letter {
  name: string;
  style: string;
}

export interface NameLetter {
  id: string;
  classList: string[];
}

interface HangGameState {
  currentPokemon: CustomizedPokemon;
  nameLetters: NameLetter[];
  currentGuess: string;
  headerText: string;
  wrongGuesses: string[];
  rightGuesses: string[];
  gameOver: boolean;
  gameStarted: boolean;
  won: number;
  lost: number;
  letters: Letter[];
}
const initialHeaderText = `What's that pokemon ?`;

const initialState: HangGameState = {
  currentPokemon: {} as CustomizedPokemon,
  nameLetters: [],
  currentGuess: '',
  headerText: initialHeaderText,
  wrongGuesses: [],
  rightGuesses: [],
  gameOver: false,
  gameStarted: false,
  won: 0,
  lost: 0,
  letters: alphabetArray.map((letter) => ({
    name: letter,
    style: 'outline-dark',
  })),
};

const hangSlice = createSlice({
  name: 'hanggame',
  initialState,
  reducers: {
    setHangGameData: (
      state,
      action: PayloadAction<Pick<HangGameState, 'currentPokemon' | 'rightGuesses' | 'nameLetters'>>
    ) => {
      state.currentPokemon = action.payload.currentPokemon;
      state.rightGuesses = action.payload.rightGuesses;
      state.nameLetters = action.payload.nameLetters;
    },
    addRightGuess: (state, action: PayloadAction<{ guessedLetter: string }>) => {
      state.rightGuesses.push(action.payload.guessedLetter);
    },
    addWrongGuess: (state, action: PayloadAction<{ guessedLetter: string }>) => {
      state.wrongGuesses.push(action.payload.guessedLetter);
    },
    addWin: (state) => {
      state.won = state.won + 1;
      state.headerText = 'You Won!!!';
    },
    addLose: (state) => {
      state.lost = state.lost + 1;
      state.headerText = 'You Lose!!!';
    },
    startGame: (state) => {
      state.gameOver = false;
      state.gameStarted = true;
    },
    endGame: (state) => {
      state.gameOver = true;
    },
    updateNameLetters: (state, action: PayloadAction<{ updatedName: NameLetter[] }>) => {
      state.nameLetters = action.payload.updatedName;
    },
    updateLetters: (state, action: PayloadAction<{ updatedLetters: Letter[] }>) => {
      state.letters = action.payload.updatedLetters;
    },
    reset: (state) => {
      state.currentPokemon = {} as CustomizedPokemon;
      state.rightGuesses = [];
      state.wrongGuesses = [];
      state.gameOver = false;
      state.gameStarted = false;
      state.headerText = initialHeaderText;
      state.currentGuess = '';
      state.letters = alphabetArray.map((letter) => ({
        name: letter,
        style: 'outline-dark',
      }));
      state.nameLetters = [];
    },
  },
});

export const {
  setHangGameData,
  updateNameLetters,
  updateLetters,
  addLose,
  endGame,
  addWin,
  startGame,
  addRightGuess,
  addWrongGuess,
  reset,
} = hangSlice.actions;
export const selectCurrentRandomPokemon = (state: RootState) => state.hangGame.currentPokemon;
export const selectNameLetters = (state: RootState) => state.hangGame.nameLetters;
export const selectLetters = (state: RootState) => state.hangGame.letters;
export const selectRightGuessed = (state: RootState) => state.hangGame.rightGuesses;
export const selectWrongGuessed = (state: RootState) => state.hangGame.wrongGuesses;
export const selectGameStarted = (state: RootState) => state.hangGame.gameStarted;
export const selectGameOver = (state: RootState) => state.hangGame.gameOver;
export const selectWon = (state: RootState) => state.hangGame.won;
export const selectLost = (state: RootState) => state.hangGame.lost;
export const selectHeaderText = (state: RootState) => state.hangGame.headerText;

export default hangSlice.reducer;
