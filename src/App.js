import React from 'react';
import Home from './pages/Home';
import './assets/global.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from './pages/Register';
import Orders from './pages/Orders';
import Products from './pages/Products';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact/>
        <Route component={Register} path="/register" exact/>
        <Route component={Orders} path="/orders" exact/>
        <Route component={Products} path="/products" exact/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
