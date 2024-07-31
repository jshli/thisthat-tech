import { ChangeEvent, useState } from 'react';
import { Dropdown } from './Dropdown/Dropdown';

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
        {inputValue.length > 1 && <Dropdown inputValue={inputValue} />}
      </div>
    </div>
  );
};
