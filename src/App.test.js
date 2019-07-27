import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  await ReactDOM.render(<App />, div);
  await ReactDOM.unmountComponentAtNode(div);
});
