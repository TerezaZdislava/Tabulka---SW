import React from 'react';
import { render } from 'react-dom';
import './index.html';
import { Table } from './Table.jsx';

const App = () => {
  return <Table />;
};

render(<App />, document.querySelector('#app'));
