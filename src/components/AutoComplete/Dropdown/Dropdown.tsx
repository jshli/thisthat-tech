import { paths } from '../../../../schema';
import { Movie } from '../../../types';

type Props = {
  isPending: boolean;
  onSelect: (value: Movie) => void;
  results: paths['/3/search/movie']['get']['responses']['200']['content']['application/json']['results'];
  selectedIds: Movie['id'][];
};

export const Dropdown = ({
  isPending,
  results,
  onSelect,
  selectedIds,
}: Props) => {
  if (isPending) {
    return (
      <div
        role="listbox"
        className={'absolute w-full px-1 bg-gray-light max-h-80 overflow-auto'}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (!isPending && results && results.length === 0) {
    return (
      <div
        role="listbox"
        className={'absolute w-full px-1 bg-gray-light max-h-80 overflow-auto'}
      >
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
        {results.map((movie) => {
          const isSelected = selectedIds.includes(movie.id);
          if (isSelected) {
            return null;
          }
          return (
            <li
              aria-disabled={isSelected}
              role="option"
              className="list-none"
              key={movie.id}
              onClick={() => {
                if (isSelected) {
                  return;
                }
                onSelect(movie);
              }}
            >
              {movie.title}
            </li>
          );
        })}
      </ul>
    );
  }
};
