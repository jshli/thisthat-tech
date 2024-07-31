import { useGetCharacters } from '../../../hooks/useGetCharacters';

type Props = {
  inputValue: string;
};

export const Dropdown = ({ inputValue }: Props) => {
  const { response, isError, isPending } = useGetCharacters(inputValue);

  if (isPending) {
    return (
      <div role="listbox" className={'dropdown dropdown--empty'}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isPending && response && response.data && response.data?.count === 0) {
    return (
      <div role="listbox" className={'dropdown dropdown--empty'}>
        <p>No options</p>
      </div>
    );
  }

  return (
    <ul role="listbox" className={'dropdown'} tabIndex={-1}>
      {response.data.results.map((option) => (
        <li className="list-none" key={option.id}>
          {option.name}
        </li>
      ))}
    </ul>
  );
};
