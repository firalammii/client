import React from 'react';
import './components/css/App.css';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';



function App() {
  const navigate = useNavigate();

  return (
    <>
    <div className="App">
      
      <h1 style={{color: "green"}}>WELCOME </h1>
      <h1 style={{color: "yellow"}}> <b>to</b></h1>
      <h1 style={{color: "red"}}>Dispute Management System</h1>

      {/* <Re/>
      <Si/> */}

      {/* <Textfield/> */}

      <div >
        <Button className='buttons' onClick = {()=>navigate('/customer/signup')}> SIGNUP </Button>
        <Button className='buttons' variant="contained"onClick = {()=>navigate('/customer/login')}> LOGIN </Button>
      </div>
      
    </div>
    

    </>
  );
}

export default App;
