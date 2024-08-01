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
      style={{
        backgroundColor: isFocused ? '#FF629F' : 'inherit',
      }}
      className="flex rounded-md items-center gap-3 duration-300 transition-all list-none p-2 cursor-pointer hover:bg-pink"
      {...rest}
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
};
