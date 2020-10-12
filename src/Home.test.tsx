import React from 'react';
import Home from './Home';
import { render } from '@testing-library/react';

it('renders correctly', async () => {
    const home = render(<Home />);
    expect(home).toMatchSnapshot();
});