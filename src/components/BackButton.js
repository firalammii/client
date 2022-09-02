import React from 'react'
import { Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
function BackButton() {
    const navigate = useNavigate();
  return (
    <Button onClick={(e) =>navigate(-1)}> BACK </Button>
  )
}

export default BackButton