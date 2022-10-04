import React from 'react'
import Request from '../request/Request';
import CustomerProfile from './CustomerProfile'

import '../css/customer.css';

import { Container, Grow, Grid, AppBar, Typography } from '@mui/material';

//   const styles = {
//     .appBar {
//     borderradius: 15;
//     margin: '30px 0';
//     display: 'flex';
//     flex-direction: 'row';
//     justify-content: 'center';
//     align-items: 'center';
// }
// .heading {
//   color: 'rgba(0,183,255, 1)';
// }
// .image {
//   margin-left: '15px';
// }
// };

const CustomerPage = ({loginId}) => {

  return (
    <Container maxwidth="lg" >
      <AppBar className='appBar' maxwidth= "40rem" position="static" color="inherit">
        <Typography className='heading' variant="h2" align="center">Memories</Typography>
        <img className="image" alt="icon" height={60} />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Request />
            </Grid>
            <Grid item xs={12} sm={9}>
              <CustomerProfile loginId={loginId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default CustomerPage