import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from '@jest/globals';
import Home from './page';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('Home Component', () => {
  it('renders the Title, Divider, and ProductTable', async () => {
    const { getByText, getByRole } = render(<Home />);
    await waitFor(() => {
      expect(getByText('FakeStoreAPI Product CRUD')).not.toBeNull();
      expect(getByRole('separator')).not.toBeNull();
      expect(getByRole('status')).not.toBeNull();
    });
  });
});
