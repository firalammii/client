import React from 'react'
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import "./customer/signup2.css"
function BackButton() {
    const navigate = useNavigate();
  return (
    <Button className='buttons' onClick={(e) =>navigate(-1)}> BACK </Button>
  )
}

export default BackButton