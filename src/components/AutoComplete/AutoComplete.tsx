import { useState } from 'react';
import { Movie } from '../../types';
import { List } from './List/List';
import { Input } from './Input/Input';

export const AutoComplete = () => {
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  return (
    <>
      <List
        selected={selectedMovies}
        onRemove={(id) =>
          setSelectedMovies(selectedMovies.filter((movie) => movie.id !== id))
        }
      />
      <Input
        selected={selectedMovies}
        onSelect={(value) => setSelectedMovies([...selectedMovies, value])}
      />
    </>
  );
};
