import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi, afterEach } from 'vitest';
import { Dropdown } from './Dropdown';
import { searchResults } from '../../../mocks/mocks';
import { userEvent } from '@storybook/test';

const mockedOnSelect = vi.fn();

describe('Dropdown', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('displays loading text if loading', () => {
    render(
      <Dropdown
        isPending={true}
        results={[]}
        onSelect={mockedOnSelect}
        selectedIds={[]}
      />
    );
    expect(screen.getByText('Loading...')).toBeVisible();
  });

  it('displays No Options if not loading and no options', () => {
    render(
      <Dropdown
        isPending={false}
        results={[]}
        onSelect={mockedOnSelect}
        selectedIds={[]}
      />
    );
    expect(screen.getByText('No options')).toBeVisible();
  });

  it('displays options in a list if there are results', () => {
    render(
      <Dropdown
        selectedIds={[]}
        isPending={false}
        results={searchResults}
        onSelect={mockedOnSelect}
      />
    );
    expect(screen.getByRole('option', { name: 'Spirited Away' }));
  });

  it('fires the onSelect if option is pressed', async () => {
    const user = userEvent.setup();
    render(
      <Dropdown
        isPending={false}
        results={searchResults}
        onSelect={mockedOnSelect}
        selectedIds={[]}
      />
    );

    const selectedMovie = searchResults[0];

    await user.click(screen.getByRole('option', { name: selectedMovie.title }));
    expect(mockedOnSelect).toHaveBeenCalledWith(selectedMovie);
  });

  it('does not render an option if it has already been selected', async () => {
    const user = userEvent.setup();
    const selectedMovie = searchResults[0];
    render(
      <Dropdown
        selectedIds={[selectedMovie.id]}
        isPending={false}
        results={searchResults}
        onSelect={mockedOnSelect}
      />
    );

    expect(
      screen.queryByRole('option', { name: selectedMovie.title })
    ).toBeNull();
  });
});
