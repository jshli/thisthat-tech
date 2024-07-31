import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Movie } from './types';
import { List } from './components/List/List';
import { AutoComplete } from './components/AutoComplete/AutoComplete';

function App() {
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  return (
    <>
      <List selected={selectedMovies} />
      <AutoComplete
        onSelect={(value) => setSelectedMovies([...selectedMovies, value])}
      />
    </>
  );
}

export default App;
