
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Button} from 'react-bootstrap';
import BackButton from '../BackButton'

import "../../css/inputs.css";


const herokuUrl = "https://dispute-api.herokuapp.com";
const localUrl = "http://localhost:3000";

// const NAME_REGEX = /^[A-z]$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {

    const navigate = useNavigate();

    const[data, setData] = useState({
        firstName: "", 
        middleName: "",  
        lastName: "",  
        //urbanks: [ bankSchema ],
        phoneNumber: "",
        pwd: "",
        matchPwd: ""
    })

    function handleFields(event){
        const newData = {...data}
        newData[event.target.id] = event.target.value;
        setData(newData);
    }

    
    function handleSubmit(e){

        e.preventDefault(e);
        axios.post(herokuUrl + '/customer/signup',{
            firstName: data.firstName,  
            middleName: data.middleName,  
            lastName: data.lastName,  
            phoneNumber: data.phoneNumber,
            pwd: data.pwd,
            
        }).then((res) => {
            if(res.data.message === "success"){
                alert("WELCOME " + res.data.result.firstName + " " + res.data.result.middleName +" !");
                const newData = {...data}
                newData[e.target.id] = "";
                setData(newData);
                navigate("/customer/login");
            }
            else if(res.data.status === 400){
                alert(res.data.message)
            }
            else alert("received but not saved")
            
        }).catch((err) => alert(err.message))
    }


    return(
    <section className="section">
        <form style={
            {border: "2px solid grey", width: "auto", alignItems: "stretch",
            autoComplete: "off",
            margin: "0.5rem", padding: "0.5rem 0.5rem", display: "flex", flexDirection: "column",
            borderRadius: "0.5rem" }
        }>
            <h4 
                style={
                    {
                        textAlign: "center", justifyContent: "center", display: "flex", flexDirection: "column",
                        backgroundColor: "rgba(0,0,0,0.4)",height:"3rem", padding: "1rem", border: "1px solid grey", borderRadius: "0.5rem",
                    }
                }
            >
                Registration Form
            </h4>
            <label htmlFor="firstName">First Name: </label>
            <input
                className="inputs"
                type = {"text"}
                id={"firstName"}
                label = {"First Name"}
                placeholder = {"First Name"}
                variant = {"outlined"}
                value = {data.firstName}
                onChange={(e) => handleFields(e)}
            />
           
           <label htmlFor="middleName">Middle Name: </label>
           
            <input
                className= "inputs"
                type = {"text"}
                id= {"middleName"}
                label = {"Middle Name"}
                placeholder = {"middle Name"}
                variant = {"outlined"}
                value = {data.middleName}
                onChange= {(e)=> handleFields(e)}
            />
         
            <label htmlFor="lastName">Last Name: </label>
            <input
                className= "inputs"
                type = {"text"}
                id= {"lastName"}
                label = {"Last Name"}
                placeholder = {"Last Name"}
                variant = {"outlined"}
                value = {data.lastName}
                onChange= {(e)=>handleFields(e)}
            />

            <label htmlFor="phoneNumber">Phone Number: </label>
            <input
                className= "inputs"
                autoComplete="off"
                type = {"tel"}
                id= {"phoneNumber"}
                label = {"Mobile Phone Number"}
                placeholder = {"0912345678"}
                variant = {"outlined"}
                value = {data.phoneNumber}
                onChange= {(e)=>handleFields(e)}
            />
            
            <label htmlFor="pwd">Create Password: </label>
            <input
                className= "inputs"
                autoComplete="off"
                type = {"password"}
                id= {"pwd"}
                label = {"password"}
                placeholder = {"jSsau3A#@"}
                variant = {"outlined"}
                value = {data.pwd}
                onChange= {(e)=>handleFields(e)}
            />
            
            <label htmlFor="matchPwd">Confirm Password: </label>
            <input
                className= "inputs"
                type = {"password"}
                id= {"matchPwd"}
                label = {"confirmPassword"}
                placeholder = {"jSsau3A#@"}
                variant = {"outlined"}
                value = {data.matchPwd}
                onChange= {(e)=>handleFields(e)}
            />
            <Button
                className= 'buttons'
                variant = {"contained"}
                color = {"primary"}
                onClick = {(e) => {
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
                className= 'buttons'
                variant = {"contained"}
                color="secondary"
                onMouseOver= {() => <h3>already have one</h3>}
                onClick = {(e) => {
                    navigate('/customer/login');
                }}
            >
                <i>already have one? </i> <b>Login</b>
            </Button>
            
            <BackButton className= 'buttons'/>
       </form>
       </section>
    );
}
export default Signup;