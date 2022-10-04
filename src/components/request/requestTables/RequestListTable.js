import React from 'react'
import useAxios from 'axios-hooks';
// import CLT from './CLT';
import ListTable from './RequestTable'

import { Box, CircularProgress } from '@mui/material';

const herokuUrl = "https://dispute-api.herokuapp.com";
const localUrl = "http://localhost:3000";

const CustomerListTable = () => {
    
  const [{data, loading, error}] = useAxios( herokuUrl + "/customer/list")
  if(loading){
    return(
    <Box sx={{display:'flex'}}>
        <CircularProgress/>
    </Box>
    )
  }
  if(error){
    return (
      <Box sx={{display:'flex'}}>
        <CircularProgress/>
    </Box>
    )
  }

  const headCells = [
    { id: 'oid', numeric: false, disablePadding: true, label: 'O_id (MongoDB determined)' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'middleName', numeric: false, disablePadding: false, label: 'Middle Name' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Tel' },
    { id: 'regxnDate', numeric: false, disablePadding: false, label: 'Rgxn Date' },
    { id: 'requests', numeric: false, disablePadding: false, label: 'Request Ids' },

  ];

  return (
    // <CLT data = {data} headCells={headCells} tableTitle= "Customer Information Table" />
    <ListTable data = {data} headCells={headCells} tableTitle= "Customer Information Table" />
  )
}

export default CustomerListTable