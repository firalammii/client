
import React, {useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import { Button} from 'react-bootstrap';
//import {TextField} from "@material-ui/core";
import BackButton from './BackButton'
import { Box, TextField } from "@mui/material";



const Signup = ()=>{
    const herokuUrl = "https://dispute-mgt-sys-api.herokuapp.com";
    //const localUrl = "http://localhost:3000";

    const navigate = useNavigate();


    const[data, setData] = useState({
        firstName: '',  
        middleName: '',  
        lastName: '',  
        //urbanks: [ bankSchema ],
       // email: '',
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
        Axios.post(herokuUrl + '/customer/signup',{
            firstName: data.firstName,  
            middleName: data.middleName,  
            lastName: data.lastName,  
            email: data.email,
            phoneNumber: data.phoneNumber,
            pwd: data.pwd,
        }).then(res=>{

            alert("WELCOME " + res.data.result.firstName + " " + res.data.result.middleName);
            navigate("/customer/login");
        }).catch(err=>{
            alert(err)
        })
    }


    return(

        <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '50ch', height: '4.5ch'},
            }}
            validate
            autoComplete="on"
            display={'flex'}
            flexDirection={'column'}
            justifyContent= {'center'}
            alignItems={'center'}
            marginTop={"3px"}
            border={"1px solid mediumblue"}
        >

            <TextField
                type = {"text"}
                id={"firstName"}
                label = {"First Name"}
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
                type = {"email"}
                id={"email"}
                label = {"Email"}
                placeholder = {"sth@sth.com"}
                variant = {"outlined"}
                value = {data.email}
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
            
       </Box>
    );
}
export default Signup;