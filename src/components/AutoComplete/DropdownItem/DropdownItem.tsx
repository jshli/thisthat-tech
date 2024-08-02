import { HTMLAttributes } from 'react';
import { Movie } from '../../../types';

type Props = {
  isFocused: boolean;
  movie: Movie;
} & HTMLAttributes<HTMLLIElement>;

export const DropdownItem = ({ isFocused, movie, ...rest }: Props) => {
  const getMovieYear = (date: string | undefined) =>
    date ? date.split('-')[0] : '';

  return (
    <li
      role="option"
      aria-label={movie.title}
      className={`flex cursor-pointer list-none items-center gap-3 rounded-md p-2 transition-all duration-300 hover:bg-pink ${isFocused ? 'bg-pink' : 'bg-none'}`}
      {...rest}
    >
      <img
        className="h-20 rounded-md"
        src={`http://image.tmdb.org/t/p/w780/${movie.poster_path}`}
      />

      <div>
        <p>{movie.title}</p>
        <p className="text-gray-200 text-xs">
          {getMovieYear(movie.release_date)}
        </p>
      </div>
    </li>
  );
};
