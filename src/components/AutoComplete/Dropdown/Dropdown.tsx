import { useSearchMovies } from '../../../hooks/useGetCharacters';

type Props = {
  inputValue: string;
};

export const Dropdown = ({ inputValue }: Props) => {
  const { isError, isPending, data } = useSearchMovies(inputValue);

  if (isPending) {
    return (
      <div role="listbox" className={'dropdown dropdown--empty'}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isPending && data && data.total_results === 0) {
    return (
      <div role="listbox" className={'dropdown dropdown--empty'}>
        <p>No options</p>
      </div>
    );
  }

  if (data?.results) {
    return (
      <ul role="listbox" className={'dropdown'} tabIndex={-1}>
        {data.results.map((option) => (
          <li className="list-none" key={option.id}>
            {option.title}
          </li>
        ))}
      </ul>
    );
  }
};
