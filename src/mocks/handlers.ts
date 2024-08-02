import { http, HttpResponse } from 'msw';
import { searchResults } from './mocks';

export const handlers = [
  http.get('https://api.themoviedb.org/3/search/movie', () => {
    return HttpResponse.json({
      results: searchResults,
    });
  }),
];
