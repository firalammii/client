import React, {useState} from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap';
import TextField from "@material-ui/core/TextField";
import {styles} from './Signup'
import BackButton from "../BackButton";
import { Box } from "@mui/material";


const heroku_url = "https://dispute-mgt-sys-api.herokuapp.com";
const local_url = "http://localhost:3000";

const Login = () =>{

    const navigate = useNavigate();
    const classes = styles();
    const [data, setData] = useState({
        phoneNumber: '',
        pwd: "",
    })

    function handleFields(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.post(heroku_url+ "/customer/login",{
            phoneNumber: data.phoneNumber,
            pwd: data.pwd,
        }).then(res=>{
            handleLogin(res.data)
        }).catch(err=>{
            alert(err);
        })
    }

    function handleLogin (resData){

        if(resData.message === "allow"){
            alert("WELCOME BACK " + resData.result.firstName+" "+resData.result.lastName+"!!\nsuccessfully logged in");
            navigate('/request/post');
        }
       
        else {
            alert(resData.message)
        }
    }


    return(
        <Box component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '50ch', height: '6ch'},
            }}
            validate
            autoComplete="on"
            display={'flex'}
            flexDirection={'column'}
            justifyContent= {'center'}
            alignItems={'center'}
            marginTop={"3px"}
            border={"1px solid mediumblue"}>

            <TextField
                type = {"tel"}
                id={"phoneNumber"}
                className= {classes.TextField}
                
                label = {"Mobile Phone Number"}
                placeholder = {"0912345678"}
                variant = {"outlined"}
                value = {data.phoneNumber}
                onChange={(e)=>handleFields(e)}
            />

            <TextField
                type = {"password"}
                id={"pwd"}
                className= {classes.TextField}
                //required ={true}
                label = {"password"}
                placeholder = {"jSsau3A#@"}
                variant = {"outlined"}
                value = {data.pwd}
                onChange={(e)=>handleFields(e)}
            />
            <div>
                <Button
                
                variant = {"contained"}
                color = {"primary"}
                className= {classes.TextField}
                onClick = {(e)=> {
                    handleSubmit(e)
                }}
            >
                Log in
            </Button>

            <Button
                label= {'new user?'}
                className= {classes.TextField}
                onClick = {(e)=> {
                    navigate('/customer/signup')

                }}
            >
                Create Identity
            </Button>
            <BackButton />
            </div>

        </Box>
    );
}

export default Login