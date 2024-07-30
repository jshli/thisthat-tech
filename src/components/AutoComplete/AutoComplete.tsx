import { useGetCharacters } from '../../hooks/useGetCharacters';

export const AutoComplete = () => {
  const response = useGetCharacters();
  console.log('response', response);
  return <p>hello world!</p>;
};
