import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app'
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBQrTYMhHUHr-SksmFw--9Zk5Mh1LcCS5s",
  authDomain: "cart-d6602.firebaseapp.com",
  projectId: "cart-d6602",
  storageBucket: "cart-d6602.appspot.com",
  messagingSenderId: "292940995603",
  appId: "1:292940995603:web:b0176de9e75a1e02eaf3e6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

