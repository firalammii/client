
import React, {useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import { Button, Form} from 'react-bootstrap';
import {TextField} from "@mui/material";
import BackButton from '../BackButton'
import { Box } from "@mui/material";

import '../../css/inputs.css'

const heroku_url = "https://dispute-mgt-sys-api.herokuapp.com";
const local_url = "http://localhost:3000";

const Signup = ()=>{
    
    const navigate = useNavigate();

    const[data, setData] = useState({
        firstName: '',  
        middleName: '',  
        lastName: '',  
        //urbanks: [ bankSchema ],
        phoneNumber: '',
        pwd: "",
        matchPwd: ""
    })

    function handleFields(event){
        const newData = {...data}
        newData[event.target.id] = event.target.value;
        setData(newData);
    }

    function handleSubmit(e){
        e.preventDefault();
        Axios.post(heroku_url + "/customer/signup",{
            firstName: data.firstName,  
            middleName: data.middleName,  
            lastName: data.lastName,  
            //urbanks: [ bankSchema ],
            phoneNumber: data.phoneNumber,
            pwd: data.pwd,
        }).then(res=>{

            alert("WELCOME " + res.data.result.firstName);
            navigate("/customer/login");
        }).catch(err=>{
            alert(err)
        })
    }


    return(

        <Form 
            // sx={{
            //     '& .MuiTextField-root': { m: 2, width: '30ch', height: '4ch'},
            // }}
            style={{
                border: "2px solid grey", width: "18rem", alignItems: "stretch",
            margin: "0.5rem", padding: "0.5rem 0.5rem", display: "flex", flexDirection: "column",
            boxSizing: "border-box", borderRadius: "0.5rem",
            }}
        
        >

            <TextField
            style={{
                    alignItems: "stretch",
            margin: "0.5rem", padding: "0.5rem 0.5rem", display: "flex", flexDirection: "column",
            borderRadius: "0.5rem",
            }}
            label = {"First Name"}
                type = {"text"}
                id={"firstName"}
                placeholder = {"First Name"}
                variant = {"outlined"}
                value = {data.firstName}
                onChange={(e)=>handleFields(e)}
            />
            

            <TextField
                type = {"text"}
                id={"middleName"}
            
                label = {"Middle Name"}
                placeholder = {"middle Name"}
                variant = {"outlined"}
                value = {data.middleName}
                onChange={(e)=>handleFields(e)}
            />

            <TextField
                type = {"text"}
                id={"lastName"}
               
                label = {"Last Name"}
                placeholder = {"Last Name"}
                variant = {"outlined"}
                value = {data.lastName}
                onChange={(e)=>handleFields(e)}
            />

            <TextField
                type = {"tel"}
                id={"phoneNumber"}
       
                label = {"Mobile Phone Number"}
                placeholder = {"0912345678"}
                variant = {"outlined"}
                value = {data.phoneNumber}
                onChange={(e)=>handleFields(e)}
            />

            <TextField
                type = {"password"}
                id={"pwd"}
               
                label = {"password"}
                placeholder = {"jSsau3A#@"}
                variant = {"outlined"}
                value = {data.pwd}
                onChange={(e)=>handleFields(e)}
            />

            <TextField
                type = {"password"}
                id={"matchPwd"}
            
                label = {"confirmPassword"}
                placeholder = {"jSsau3A#@"}
                variant = {"outlined"}
                value = {data.matchPwd}
                onChange={(e)=>handleFields(e)}
            />
            <div>

            <Button
                variant = {"contained"}
                color = {"primary"}
                
                onClick = {(e)=> {
                    if(data.pwd !== data.matchPwd){
                        alert("the passwords are different!!");
                    }
                    else{
                        handleSubmit(e)
                    }

                }}
            >
                Sign up
            </Button>

            <Button
                
                variant = {"contained"}
                color = {"primary"}
              
                onMouseOver={()=> <h3>already have one</h3>}
                onClick = {(e)=> {
                    navigate('/customer/login')

                }}
                
            >
                Login
            </Button>
            
            <BackButton />
            </div>
            
       </Form>
    );
}
export default Signup;