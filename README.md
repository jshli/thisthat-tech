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

## What next

- The movie API provides further filtering options, such as by Language, Release Date and Ratings. It would make sense to expose those API capabilities to the front-end, allowing the user more granularity in searching
- Currently the UI is completely coupled with the API (i.e. the props have names like 'selectedMovies'). It might make sense to make this a generic 'Selector' component that takes any data array
- Expand on the UI, possible allowing the user to expand movie selections to see more details, or to rearrange the list so there's a preference order.
