import { paths } from '../../../../schema';
import { useSearchMovies } from '../../../hooks/useSearchMovies';

type Props = {
  isPending: boolean;
  results: paths['/3/search/movie']['get']['responses']['200']['content']['application/json']['results'];
};

export const Dropdown = ({ isPending, results }: Props) => {
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
      <ul role="listbox" className={'dropdown'} tabIndex={-1}>
        {results.map((movie) => (
          <li className="list-none" key={movie.id}>
            {movie.title}
          </li>
        ))}
      </ul>
    );
  }
};
