import React from 'react';
import Home from './pages/Home';
import ItemList from './pages/ItemList';
import ItemPage from './pages/ItemPage';
import SellerPage from './pages/SellerPage';
import Header from './components/Header';
import FooterMessage from './components/FooterMessage';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"
import { Router, Route } from 'react-router-dom';
import history from './history';

function App() {
  return (
    <Router history={history}>
      <Route path="/" exact component={Home} />
      <Header />
      <Route path="/list" component={ItemList} />
      <Route path="/items/:id" component={ItemPage} />
      <Route path="/seller" component={SellerPage} />
      <FooterMessage heading={"JORT Cares About Your Privacy"} message={"JORT is taking great strides to ensure your privacy is protected above all else. Please visit our privacy policy to learn more."} buttonLink={"/privacy"} buttonText={"Learn More"} />
    </Router>
  );
}

export default App;
