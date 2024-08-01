import { useCallback, useEffect, useState } from 'react';
import { paths } from '../../../../schema';
import { Movie } from '../../../types';
import { DropdownItem } from '../DropdownItem/DropdownItem';

type Props = {
  isPending: boolean;
  onSelect: (value: Movie) => void;
  results: paths['/3/search/movie']['get']['responses']['200']['content']['application/json']['results'];
};

export const Dropdown = ({ isPending, results, onSelect }: Props) => {
  const [focusedIndex, setFocusedIndex] = useState<undefined | number>(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (results) {
        switch (e.key) {
          case 'ArrowDown':
            setFocusedIndex((prevIndex) => {
              if (prevIndex === undefined) {
                return 0;
              } else {
                return prevIndex < results.length - 1 ? prevIndex + 1 : 0;
              }
            });
            break;
          case 'ArrowUp':
            setFocusedIndex((prevIndex) => {
              if (prevIndex === undefined) {
                return results.length - 1;
              } else {
                return prevIndex === 0 ? results.length - 1 : prevIndex - 1;
              }
            });
            break;
          case 'Enter':
            if (focusedIndex !== undefined) {
              onSelect(results[focusedIndex]);
            }
            break;
          default:
            break;
        }
      }
    },
    [focusedIndex, onSelect, results]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, focusedIndex]);

  if (isPending) {
    return (
      <div
        role="listbox"
        className={
          'absolute w-full  bg-gray-light max-h-80 overflow-auto rounded-md p-2'
        }
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (!isPending && results && results.length === 0) {
    return (
      <div
        role="listbox"
        className={
          'absolute w-full bg-gray-light max-h-80 overflow-auto rounded-md p-2 mt-2'
        }
      >
        <p>No options</p>
      </div>
    );
  }

  if (results && results.length > 0) {
    return (
      <ul
        role="listbox"
        className={
          'absolute w-full bg-gray-light max-h-80 overflow-auto rounded-md py-2 mt-2'
        }
        tabIndex={-1}
      >
        {results.map((movie, index) => {
          return (
            <DropdownItem
              key={movie.id}
              isFocused={focusedIndex === index}
              movie={movie}
              onMouseOver={() => setFocusedIndex(index)}
              onMouseLeave={() => setFocusedIndex(undefined)}
              onClick={() => onSelect(movie)}
            />
          );
        })}
      </ul>
    );
  }
};
