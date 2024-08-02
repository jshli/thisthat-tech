import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    setIsDropdownOpen(value.length > 1);
  };

  const filteredResults = useMemo(() => {
    if (data?.results) {
      const selectedIds = selected.map((movie) => movie.id);
      return data.results.filter((movie) => !selectedIds.includes(movie.id));
    } else {
      return [];
    }
  }, [data?.results, selected]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          if (inputValue.length > 1) {
            setIsDropdownOpen(true);
          }
          break;
        case 'Escape':
          setIsDropdownOpen(false);
          break;
        default:
          break;
      }
    },
    [inputValue.length]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative w-full">
      <label htmlFor="autocomplete-input" className="mb-2 block">
        Select your favourite movies
      </label>
      <div>
        <input
          className={`w-full rounded-md border-2 p-2 transition-all duration-300 ${
            isError
              ? 'border-error focus:border-error focus:outline-error'
              : 'border-gray-dark focus:border-pink focus:outline-pink'
          }`}
          role="combobox"
          id="autocomplete-input"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          list="autocomplete-options"
        />
        {isDropdownOpen && (
          <Dropdown
            isError={isError}
            isPending={isPending}
            results={filteredResults}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  );
};
