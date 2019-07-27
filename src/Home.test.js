import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

it('renders without crashing', async () => {
    const div = document.createElement('div');
    await ReactDOM.render(<Home />, div);
    await ReactDOM.unmountComponentAtNode(div);
});

it('can add things', async () => {
    const home = new Home();
    expect(home.doStuff(3,4)).toBe(7);
})