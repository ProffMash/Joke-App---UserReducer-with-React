import { useReducer } from 'react';
import './App.scss';
import { reducerCount, jokesReducer } from './Reducer';

interface Joke {
  id: number;
  joke: string;
  rate: number;
}

function App() {
  const initialJokes: Joke[] = [
    { id: 1, joke: 'What do you call a very small valentine? A valen-tiny!', rate: 3 },
    { id: 2, joke: 'What did the dog say when he rubbed his tail on the sandpaper? Rough, rough!', rate: 2 },
    { id: 3, joke: 'A termite walks into the bar and says, "Where is the bar tender?"', rate: 1 },
    { id: 4, joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!', rate: 0 },
    { id: 5, joke: 'Why was the math book sad? Because it had too many problems.', rate: 0 },
  ];

  const [jokes, dispatchJokes] = useReducer(jokesReducer, initialJokes);
  const [number, dispatch] = useReducer(reducerCount, 0);

  const handleIncrease = () => dispatch({ type: 'INCREMENT' });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputElement = e.currentTarget.elements[0] as HTMLInputElement;
    const newJoke: Joke = { id: jokes.length + 1, joke: inputElement.value, rate: 0 };
    dispatchJokes({ type: 'ADD_JOKE', payload: newJoke });
    e.currentTarget.reset();
  };

  const updateRate = (id: number, newRate: number) => {
    dispatchJokes({ type: 'UPDATE_RATE', payload: { id, rate: newRate } });
  };

  const deleteJoke = (id: number) => {
    dispatchJokes({ type: 'DELETE_JOKE', payload: { id } });
  };

  return (
    <div className='container'>
      {/* // <h2>Popular Joke Rating</h2>
      // <div className='btns'>
      // <button onClick={handleIncrease}>+</button>
      // <span>{number}</span>
      // <button onClick={() => dispatch({ type: 'DECREASE' })}>-</button>
      // </div> */}
      <h2>Jokes App For Fun </h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder='Add a joke' />
        <button type='submit'>Add Joke</button>
      </form>
      <div className="jokes">
        {jokes.sort((a, b) => b.rate - a.rate).map((joke) => (
          <div key={joke.id} className='joke'>
            <div className='joke-text'>{joke.joke}</div>
            <div className='text'>{joke.rate}</div>
            <div className="joke-buttons">
              <button onClick={() => updateRate(joke.id, joke.rate + 1)}>👍</button>
              <button onClick={() => updateRate(joke.id, joke.rate - 1)}>👎</button>
              <button onClick={() => deleteJoke(joke.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
