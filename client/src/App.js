import React from 'react';
import Home from './pages/Home';
import ItemList from './pages/ItemList';
import SellerPage from './pages/SellerPage';
import Profile from './pages/Profile';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { Router, Route } from 'react-router-dom';
import history from './history';
import Footer from './components/Footer';

function App() {
  return (
    <Router history={history}>
      <Route path="/" exact component={Home} />
      <Header />
      <Route path="/list" component={ItemList} />
      <Route path="/seller" component={SellerPage} />
      <Route path="/profile" component={Profile} />
      <Footer />
    </Router>
  );
}

export default App;
