import React from 'react';
import useAxios from 'axios-hooks';
import {Box, CircularProgress} from '@material-ui/core'
import ListTable from './ListTable';

const herokuUrl = "https://dispute-mgt-sys-api.herokuapp.com";
const localUrl = "http://localhost:3000";

const RequestListTable = () => {

    const [{data, loading, error}] = useAxios( herokuUrl + "/request/list")
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
    { id: 'debitedBank', numeric: false, disablePadding: false, label: 'Debited Bank' },
    { id: 'accountNumber', numeric: false, disablePadding: false, label: 'Account N0' },
    { id: 'cardNumber', numeric: false, disablePadding: false, label: 'Card Number' },
    { id: 'atmOwnerBank', numeric: false, disablePadding: false, label: 'Atm Owner Bank' },
    { id: 'debitedDate', numeric: false, disablePadding: false, label: 'Debited Date' },
    { id: 'estimatedTime', numeric: false, disablePadding: false, label: 'Estimated Time' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Requested Date' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Request Status' },

  ];
  return (
    <ListTable data = {data.result} headCells={headCells} tableTitle= "All Requests Table" />
  )
}

export default RequestListTable