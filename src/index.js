import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import Request from './components/Request';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
       <Routes>
          <Route path= '/' element= { <App/> }/>
          <Route path= '/customer/signup' element= { <Signup />}/>
          <Route path= '/customer/login' element= { <Login />}/>
          <Route path= '/request/post' element={<Request />}/>
       </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
