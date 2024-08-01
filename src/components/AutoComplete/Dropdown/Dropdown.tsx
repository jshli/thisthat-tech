import { paths } from '../../../../schema';
import { useSearchMovies } from '../../../hooks/useSearchMovies';
import { Movie } from '../../../types';

type Props = {
  isPending: boolean;
  onSelect: (value: Movie) => void;
  results: paths['/3/search/movie']['get']['responses']['200']['content']['application/json']['results'];
};

export const Dropdown = ({ isPending, results, onSelect }: Props) => {
  if (isPending) {
    return (
      <div role="listbox" className={'dropdown dropdown--empty'}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isPending && results && results.length === 0) {
    return (
      <div role="listbox" className={'dropdown dropdown--empty'}>
        <p>No options</p>
      </div>
    );
  }

  if (results && results.length > 0) {
    return (
      <ul
        role="listbox"
        className={'absolute w-full px-1 bg-gray-light max-h-80 overflow-auto'}
        tabIndex={-1}
      >
        {results.map((movie) => (
          <li
            className="list-none"
            key={movie.id}
            onClick={() => onSelect(movie)}
          >
            {movie.title}
          </li>
        ))}
      </ul>
    );
  }
};
