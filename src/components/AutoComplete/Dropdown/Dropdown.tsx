import { useCallback, useEffect, useState } from 'react';
import { paths } from '../../../../schema';
import { Movie } from '../../../types';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { ListBox } from '../ListBox/ListBox';

type Props = {
  isPending: boolean;
  isError: boolean;
  onSelect: (value: Movie) => void;
  results: paths['/3/search/movie']['get']['responses']['200']['content']['application/json']['results'];
};

export const Dropdown = ({ isPending, results, onSelect, isError }: Props) => {
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
      <ListBox>
        <p>Loading...</p>
      </ListBox>
    );
  }

  if (isError) {
    return (
      <ListBox>
        <p>An error has occurred</p>
      </ListBox>
    );
  }
  if (!isPending && results && results.length === 0) {
    return (
      <ListBox>
        <p>No options</p>
      </ListBox>
    );
  }

  if (results && results.length > 0) {
    return (
      <ListBox>
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
      </ListBox>
    );
  }
};
