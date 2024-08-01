import { describe, expect, it, vi } from 'vitest';
import { searchResults } from '../../../mocks/mocks';
import { List } from './List';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@storybook/test';

const mockOnRemove = vi.fn();
describe('List', () => {
  it('displays a list of selected movies as list items', () => {
    const selectedMovies = searchResults.slice(0, 2);
    render(<List selected={selectedMovies} onRemove={mockOnRemove} />);
    expect(screen.getAllByRole('listitem').length).toBe(2);
  });

  it('displays the title of selected movies', () => {
    const selectedMovies = searchResults.slice(0, 2);
    render(<List selected={selectedMovies} onRemove={mockOnRemove} />);

    expect(screen.getByText(selectedMovies[0].title)).toBeVisible();
  });

  it('fires the onRemove function when x is called', async () => {
    const user = userEvent.setup();
    const selectedMovies = [searchResults[0]];
    render(<List selected={selectedMovies} onRemove={mockOnRemove} />);

    await user.click(
      screen.getByRole('button', {
        name: `Remove ${selectedMovies[0].title}`,
      })
    );
    expect(mockOnRemove).toHaveBeenCalledWith(selectedMovies[0].id);
  });
});
