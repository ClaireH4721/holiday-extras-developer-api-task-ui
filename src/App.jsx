import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Users from './components/Users';

const App = () => (
  <div className="app">
    <h1 className="app-header">Holiday Extras</h1>
    <Users data-testid="users" />
  </div>
);

export default App;
