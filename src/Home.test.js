import React from 'react';
import Home from './Home';
import renderer from 'react-test-renderer';

it('renders correctly', async () => {
    const home = renderer.create(<Home/>).toJSON();
    expect(home).toMatchSnapshot();
});