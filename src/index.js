import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/css/index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';


import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './components/customer/Signup';
// import Signup2 from './components/customer/Signup2';
// import SignupMat from './components/customer/SignupMat-ui';
import Login from './components/customer/Login';
// import Login2 from './components/customer/Login2';
// import Request from './components/request/Request';
import CustomerPage from './components/customer/CustomerPage';
// import Search from './components/customer/search';
// import RequestMaterial from './components/RequestMaterial-UI'
// import CustomerListTable from '../../store/CustomerListTable';
// import ReactTable from './components/customer/tables/ReactTable';
import Request from './components/request/Request';
import CustomerListTable from './components/customer/tables/CustomerListTable';
// import ReactBoot from './components/customer/tables/React-Boot';
// import CustomerListTable1 from './components/customer/tables/CustomerListTable';
// import EnhancedTable2 from './components/EnhancedTable2';
// import EnhancedTable from './components/EnhancedTable';

import RequestListTable from './components/request/requestTables/RequestListTable';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
       <Routes>
          <Route path= '/' element= { <App/> }/>
          <Route path= '/customer/signup' element= { <Signup /> }/>
          <Route path= '/customer' element= { <CustomerPage /> }/>

          {/* <Route path= '/customer/signup2' element= { <Signup2 /> }/> */}
          {/* <Route path= '/customer/signupmat' element= { <SignupMat /> }/> */}

          <Route path= '/customer/login' element= { <Login /> }/>

          {/*<Route path= '/customer/login2' element= { <Login2 /> }/>*/}
          {/* <Route path= '/customer/:email' element= { <Search /> }/> */}
          {/* <Route path= '/customer/list' element= { <EnhancedTable2 /> }/> */}
          <Route path= '/customer/list' element= { <CustomerListTable /> }/>
          {/* <Route path= '/customer/list' element= { <ReactBoot /> }/> */}
          {/* <Route path= '/customer/enhanced-table' element= { <EnhancedTable /> }/> */}
          {/* <Route path= '/customer/reacttable' element= { <ReactTable /> }/> */}
          


          {/* <Route path= '/request/material-ui' element= { <RequestMaterial /> }/>*/}

          <Route path= '/request/post' element={ <Request /> }/>
          <Route path= '/request/list' element={ <RequestListTable /> }/> 
          
       </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
