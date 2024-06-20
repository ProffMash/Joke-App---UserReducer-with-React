interface Joke {
  id: number;
  joke: string;
  rate: number;
}

type IAction = { type: 'INCREMENT' | 'DECREASE' };

export const reducerCount = (state: number, action: IAction) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      return state;
  }
};

type JokeAction = 
  | { type: 'ADD_JOKE'; payload: Joke }
  | { type: 'UPDATE_RATE'; payload: { id: number, rate: number } }
  | { type: 'DELETE_JOKE'; payload: { id: number } };

export const jokesReducer = (state: Joke[], action: JokeAction) => {
  switch (action.type) {
    case 'ADD_JOKE':
      return [...state, action.payload];
    case 'UPDATE_RATE':
      return state.map(joke => 
        joke.id === action.payload.id ? { ...joke, rate: action.payload.rate } : joke
      );
    case 'DELETE_JOKE':
      return state.filter(joke => joke.id !== action.payload.id);
    default:
      return state;
  }
};
