# React + TypeScript + Vite

This application allows users to search for and select/remove their favourite movies.

## Getting Started

First, create an `.env.local` file in the root of this project, with VITE_MOVIE_DB_KEY="" (I should have emailed the api key across).

Then, run:

```bash
pnpm install
pnpm run dev
```

This application comes with Storybook for UI development and integration testing. To run,

```bash
pnpm run storybook
```

To run tests:

```bash
pnpm run test
```

## Features

- TailwindCSS for style utilities
- React-query for fetching/state management
- Vitest + React Testing Library for unit testing
- Storybook for UI development and integration testing
- MSW for mocking API endpoints

## Challenges

- Implementing full keyboard functionality to provide an accessible UX was an interesting challenge. Writing integration tests that tested for keyboard accessibility also provided a good challenge.
- Minimising the use of libraries. Most of the imported libraries were related to testing/code quality/linting, which the two exceptions being Tailwind and react-query.

## What next

- The movie API provides further filtering options, such as by Language, Release Date and Ratings. It would make sense to expose those API capabilities to the front-end, allowing the user more granularity in searching
- Currently the UI is completely coupled with the API (i.e. the props have names like 'selectedMovies'). It might make sense to make this a generic 'Selector' component that takes any data array
- Better error handling. Some movies don't have posters - it would make sense to handle those missing images gracefully. Addtionally, wrapping the app in an error boundary will ensure there's fallback UI if something within the app breaks
- Expand on the UI, possible allowing the user to expand movie selections to see more details, or to rearrange the list so there's a preference order.
