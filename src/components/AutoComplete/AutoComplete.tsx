import { ChangeEvent, useMemo, useState } from 'react';
import { Dropdown } from './Dropdown/Dropdown';
import { debounce } from '../../utilities/debounce';
import { useSearchMovies } from '../../hooks/useSearchMovies';

export const AutoComplete = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [searchStr, setSearchStr] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
          <Dropdown isPending={isPending} results={data?.results} />
        )}
      </div>
    </div>
  );
};
