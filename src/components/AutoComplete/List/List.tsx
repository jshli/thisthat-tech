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
          className="flex items-center mb-4"
          aria-label={movie.title}
        >
          <div
            style={{
              background: `linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(255, 97, 159, 0.8)), url(http://image.tmdb.org/t/p/w780/${movie.backdrop_path}) center / cover`,
            }}
            className={
              'justify-between flex p-2 rounded-md h-16 w-full bg-cover bg-center items-center'
            }
          >
            <p>{movie.title}</p>
          </div>
          <button
            className="ml-3 p-2 rounded-full hover:text-pink"
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
