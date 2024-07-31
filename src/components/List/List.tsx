//TODO: ensure duplicate movies cannot be selected

import { Movie } from '../../types';

type Props = {
  selected: Movie[];
};
export const List = ({ selected }: Props) => {
  return (
    <ul>
      {selected.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
};
