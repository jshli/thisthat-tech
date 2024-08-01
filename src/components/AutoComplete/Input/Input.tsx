import { ChangeEvent, useMemo, useState } from 'react';
import { Dropdown } from '../Dropdown/Dropdown';
import { useSearchMovies } from '../../../hooks/useSearchMovies';
import { debounce } from '../../../utilities/debounce';
import { Movie } from '../../../types';

type Props = {
  onSelect: (value: Movie) => void;
  selected: Movie[];
};

export const Input = ({ onSelect, selected }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchStr, setSearchStr] = useState<string>('');
  const { isPending, isError, data } = useSearchMovies(searchStr);

  const debouncedSetSearchStr = useMemo(
    () => debounce((value: string) => setSearchStr(value), 500),
    [setSearchStr]
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchStr(value);
  };

  return (
    <div>
      <label htmlFor="autocomplete-input" className="label">
        Select your favourite movies
      </label>
      <div>
        <input
          role="combobox"
          id="autocomplete-input"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          list="autocomplete-options"
        />
        {inputValue.length > 1 && (
          <Dropdown
            selectedIds={selected.map((movie) => movie.id)}
            isPending={isPending}
            results={data?.results}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  );
};
