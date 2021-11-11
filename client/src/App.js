import React, { useState, useEffect } from "react";
//Pages
import Home from './pages/Home';
import ItemList from './pages/ItemList';
import SellerPage from './pages/SellerPage';
import Profile from './pages/Profile';
import Header from './components/Header';

//Firebase
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'
import { getFirebase } from 'react-redux-firebase'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import {firebaseConfig} from './firebaseConfig.js'

//Stripe
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

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



  const rfConfig = {
  userProfile: 'items'
  }

  firebase.initializeApp(firebaseConfig)

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk.withExtraArgument(getFirebase))));

  const stripePromise = loadStripe('pk_test_A7jK4iCYHL045qgjjfzAfPxu');
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };



  
  return (
    <Provider store={store}>
    <ReactReduxFirebaseProvider
    firebase={firebase}
    config={rfConfig}
    dispatch={store.dispatch}
    >
    <Elements stripe={stripePromise} options={options}>
    <Router history={history}>
      <Route path="/" exact component={Home} />
      <Header />
      <Route path="/list" component={ItemList} />
      <Route path="/seller" component={SellerPage} />
      <Route path="/profile" component={Profile} />
      {!device ? <Footer /> : <MobileNav />}
    </Router>
    </Elements>
    </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;

