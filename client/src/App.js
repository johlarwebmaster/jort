import React, { useState, useEffect } from "react";
import Home from './pages/Home';
import ItemList from './pages/ItemList';
import SellerPage from './pages/SellerPage';
import Profile from './pages/Profile';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { Router, Route } from 'react-router-dom';
import history from './history';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import CheckDevice from "./actions/Device";

function App() {
  const [device, setDevice] = useState(false);

  useEffect(() => {
    let mobile = CheckDevice()
    setDevice(mobile);
  }, []);

  return (
    <Router history={history}>
      <Route path="/" exact component={Home} />
      <Header />
      <Route path="/list" component={ItemList} />
      <Route path="/seller" component={SellerPage} />
      <Route path="/profile" component={Profile} />
      {!device ? <Footer /> : <MobileNav />}
    </Router>
  );
}

export default App;
