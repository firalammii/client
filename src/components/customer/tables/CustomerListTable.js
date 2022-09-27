import React from 'react'
import useAxios from 'axios-hooks';
import {Box, CircularProgress, TableCell} from '@material-ui/core'
import ListTable from './ListTable';


const herokuUrl = "https://dispute-mgt-sys-api.herokuapp.com";
const localUrl = "http://localhost:3000";

const CustomerListTable1 = () => {
    
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
          Error!!: {error.message}
      </Box>
    )
  }

  const headCells = [
    { id: 'oid', numeric: false, disablePadding: true, label: 'O_id (MongoDB determined)' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'middleName', numeric: false, disablePadding: false, label: 'Middle Name' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Tel' },

  ];

  return (
    <ListTable data = {data} headCells={headCells} tableTitle= "Customer Information Table" />
  )
}

export default CustomerListTable1