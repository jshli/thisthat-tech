import { Movie } from '../../../types';

type Props = {
  selected: Movie[];
  onRemove: (id: Movie['id']) => void;
};
export const List = ({ selected, onRemove }: Props) => {
  return (
    <ul className="mb-4">
      {selected.map((movie) => (
        <li
          key={movie.id}
          className="mb-4 flex items-center"
          aria-label={movie.title}
        >
          <div
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(255, 97, 159, 0.8)), url(http://image.tmdb.org/t/p/w780/${movie.backdrop_path}) center / cover`,
            }}
            className={
              'flex h-16 w-full items-center justify-between rounded-md bg-cover bg-center p-2'
            }
          >
            <p>{movie.title}</p>
          </div>
          <button
            className="ml-3 rounded-full p-2 hover:text-pink"
            aria-label={`Remove ${movie.title}`}
            onClick={() => onRemove(movie.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
