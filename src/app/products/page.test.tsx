import { render } from '@testing-library/react';
import Home from '../page';
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom';

describe('Home Component', () => {
  it('renders the Title, Divider, and ProductTable', () => {
    const { getByText, getByRole, getByTestId } = render(<Home />);

    // Check if Title is rendered
    expect(getByText('FakeStoreAPI Product CRUD')).toBeInTheDocument();

    // Check if Divider is rendered
    expect(getByRole('separator')).toBeInTheDocument();

    // Check if ProductTable is rendered (Loader or DataTable)
    expect(getByTestId('product-table')).toBeInTheDocument();
  });
});
