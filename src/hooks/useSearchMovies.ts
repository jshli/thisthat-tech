import { useQuery } from '@tanstack/react-query';
import { paths } from '../../schema';
import { useCallback } from 'react';
import { debounce } from '../utilities/debounce';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_MOVIE_DB_KEY,
  },
};

const searchMovies = async (
  searchStr: string
): Promise<
  paths['/3/search/movie']['get']['responses']['200']['content']['application/json']
> => {
  console.log('hello');
  const response = await fetch(
    'https://api.themoviedb.org/3/search/movie?' +
      new URLSearchParams({
        query: searchStr,
      }),
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
};

export const useSearchMovies = (searchStr: string) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['movies', searchStr],
    queryFn: () => searchMovies(searchStr),
    enabled: searchStr.length > 1,
  });

  return {
    isPending,
    isError,
    data,
    error,
  };
};
