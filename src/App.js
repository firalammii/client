import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import useStyles from './app-styles';
import Signup from './components/customer/Signup';
import Signup2 from './components/customer/Signup2';
import Login from './components/customer/Login';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';


import Si from './components/customer/Si'
import Re from './components/request/Re'
import Textfield from "./components/Textfield"



function App() {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <>
    <div className="App">
      
      <h1 style={{color: "green"}}>WELCOME </h1>
      <h1 style={{color: "yellow"}}> <b>to</b></h1>
      <h1 style={{color: "red"}}>Dispute Management System</h1>
      {/* <Re/>
      <Si/> */}
      <Textfield/>
      {/* <div >
        <Button className='buttons' onClick = {()=>navigate('/customer/signup2')}> SIGNUP </Button>
    
        <Button className='buttons' onClick = {()=>navigate('/customer/login')}> LOGIN </Button>

      </div> */}
      
    </div>
    {/* <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Signup />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Login  />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container> */}

    </>
  );
}

export default App;
