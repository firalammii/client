import React from 'react'
import useAxios from 'axios-hooks';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ListTable from './ListTable';

const herokuUrl = "https://dispute-api.herokuapp.com";
const localUrl = "http://localhost:3000";

const CustomerListTable1 = () => {
    
  const [{data, loading, error}] = useAxios( herokuUrl + "/customer/list")
  if(loading){
    return(
      <div sx={{display:'flex'}}>
        <ProgressBar now={60} />
      </div>
    )
  }
  if(error){
    return (
      <div sx={{display:'flex'}}>
        <ProgressBar now={60} />
      </div>
    )
  }

  const headCells = [
    { id: 'oid', numeric: false, disablePadding: true, label: 'O_id (MongoDB determined)' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
    { id: 'middleName', numeric: false, disablePadding: false, label: 'Middle Name' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
    { id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Tel' },

  ];

  return (
    <ListTable data = {data} headCells={headCells} tableTitle= "Customer Information Table" />
  )
}

export default CustomerListTable1