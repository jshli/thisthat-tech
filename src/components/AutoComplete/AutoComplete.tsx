import { ChangeEvent, useState } from 'react';
import { useGetCharacters } from '../../hooks/useGetCharacters';

export const AutoComplete = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDropdownOpen(true);
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  return (
    <div>
      <label htmlFor="autocomplete-input" className="label">
        Choose your team
      </label>
      <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <input
          role="combobox"
          id="autocomplete-input"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          list="autocomplete-options"
        />
      </div>
    </div>
  );
};
