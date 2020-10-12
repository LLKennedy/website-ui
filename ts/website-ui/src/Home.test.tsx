import React from 'react';
import Home from './Home';
import ReactDOM from 'react-dom';

it('renders correctly', async () => {
    const div = document.createElement('div');
    const home = ReactDOM.render(<Home />, div);
    expect(home).toMatchSnapshot();
});