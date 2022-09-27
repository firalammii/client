
import React, {useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import { Button} from 'react-bootstrap';
import {TextField, makeStyles} from "@material-ui/core";
import BackButton from '../BackButton'
import { Box } from "@mui/material";

export const styles = makeStyles(()=>({
    Form: {
        margin: 15
    },
    TextField1: {
        marginTop: 7,
        marginLeft: 15,
        marginRight: 7
    },
    TextField: {
        margin: 7
    },
    
}))

const heroku_url = "https://dispute-mgt-sys-api.herokuapp.com";
const local_url = "http://localhost:3000";

const Signup = ()=>{
    
    const navigate = useNavigate();
    const classes = styles();

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
            border={"1px solid mediumblue"}
        >

            <TextField
                type = {"text"}
                id={"firstName"}
                className={classes.TextField1}
                label = {"First Name"}
                placeholder = {"First Name"}
                variant = {"outlined"}
                value = {data.firstName}
                onChange={(e)=>handleFields(e)}
            />

            <TextField
                type = {"text"}
                id={"middleName"}
                className={classes.TextField}
                label = {"Middle Name"}
                placeholder = {"middle Name"}
                variant = {"outlined"}
                value = {data.middleName}
                onChange={(e)=>handleFields(e)}
            />

            <TextField
                type = {"text"}
                id={"lastName"}
                className={classes.TextField}
                label = {"Last Name"}
                placeholder = {"Last Name"}
                variant = {"outlined"}
                value = {data.lastName}
                onChange={(e)=>handleFields(e)}
            />

            <TextField
                type = {"tel"}
                id={"phoneNumber"}
                className={classes.TextField}
                label = {"Mobile Phone Number"}
                placeholder = {"0912345678"}
                variant = {"outlined"}
                value = {data.phoneNumber}
                onChange={(e)=>handleFields(e)}
            />

            <TextField
                type = {"password"}
                id={"pwd"}
                className={classes.TextField}
                label = {"password"}
                placeholder = {"jSsau3A#@"}
                variant = {"outlined"}
                value = {data.pwd}
                onChange={(e)=>handleFields(e)}
            />

            <TextField
                type = {"password"}
                id={"matchPwd"}
                className={classes.TextField}
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
                className={classes.TextField}
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
                className={classes.TextField}
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