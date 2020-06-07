import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PrivateRoute } from './components/privateRoute';
import { MainPage } from './pages/main';
import { LoginPage } from './pages/login';

export function App() {
  return (
    <Router>
      <PrivateRoute component={MainPage} path={'/'} exact />
      <Route component={LoginPage} path={'/login'} />
    </Router>
  );
}
