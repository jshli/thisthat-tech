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
  const getMovieYear = (date: string | undefined) =>
    date ? date.split('-')[0] : '';

  if (isPending) {
    return (
      <div
        role="listbox"
        className={
          'absolute w-full  bg-gray-light max-h-80 overflow-auto rounded-md py-2'
        }
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (!isPending && results && results.length === 0) {
    return (
      <div
        role="listbox"
        className={
          'absolute w-full bg-gray-light max-h-80 overflow-auto rounded-md py-2 mt-2'
        }
      >
        <p>No options</p>
      </div>
    );
  }

  if (results && results.length > 0) {
    return (
      <ul
        role="listbox"
        className={
          'absolute w-full bg-gray-light max-h-80 overflow-auto rounded-md py-2 mt-2'
        }
        tabIndex={-1}
      >
        {results.map((movie) => {
          const isSelected = selectedIds.includes(movie.id);
          if (isSelected) {
            return null;
          }
          return (
            <li
              role="option"
              aria-label={movie.title}
              className="flex rounded-md items-center gap-3 duration-300 transition-all list-none p-2 cursor-pointer hover:bg-pink"
              key={movie.id}
              onClick={() => {
                if (isSelected) {
                  return;
                }
                onSelect(movie);
              }}
            >
              <img
                className="h-20 rounded-md"
                src={`http://image.tmdb.org/t/p/w780/${movie.poster_path}`}
              />

              <div>
                <p>{movie.title}</p>
                <p className="text-xs text-gray-200">
                  {getMovieYear(movie.release_date)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
};
