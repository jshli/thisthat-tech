import { useQuery } from '@tanstack/react-query';
import { paths } from '../../schema';
import { generateMd5 } from '../utilities/generateMd5';

const fetchCharacters = async (): Promise<
  paths['/v1/public/characters']['get']['responses']['200']
> => {
  const timestamp = 1709816847812;
  //TODO: This is hardcoded
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=Sp&hash=df8fe48d53389795bb8f937e17994207&ts=1709816847812&apikey=${import.meta.env.VITE_MARVEL_PUBLIC_KEY}`;
  return fetch(url).then(async (response) => {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
    return response.json();
  });
};

export const useGetCharacters = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['characters'],
    queryFn: fetchCharacters,
  });

  return {
    isPending,
    isError,
    data,
    error,
  };
};
