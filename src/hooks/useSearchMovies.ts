import { useQuery } from '@tanstack/react-query';
import { paths } from '../../schema';

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
