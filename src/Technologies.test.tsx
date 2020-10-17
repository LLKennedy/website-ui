import React from 'react';
import { render } from '@testing-library/react';
import Technologies from './Technologies';

it('renders correctly', async () => {
    const tech = render(<Technologies />);
    expect(tech).toMatchSnapshot();
});