import { Movie } from '../../../types';

type Props = {
  selected: Movie[];
  onRemove: (id: Movie['id']) => void;
};
export const List = ({ selected, onRemove }: Props) => {
  return (
    <ul>
      {selected.map((movie) => (
        <li key={movie.id} className="flex items-center ">
          <p>{movie.title}</p>
          <button
            className="ml-3 p-2 rounded-full"
            aria-label={`Remove ${movie.title}`}
            onClick={() => onRemove(movie.id)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
};
