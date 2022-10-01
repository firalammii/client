import React, {useState} from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom";
import { Button} from 'react-bootstrap';
import BackButton from "../BackButton";

import "../../css/inputs.css";
import CustomerPage from "./CustomerPage";

const herokuUrl = "https://dispute-api.herokuapp.com";
const localUrl = "http://localhost:3000";

const Login = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        phoneNumber: "",
        pwd: "",
    })

    function handleFields(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function handleSubmit(e){
        
        e.preventDefault();
        axios.post(herokuUrl + '/customer/login',{
            phoneNumber: data.phoneNumber,
            pwd: data.pwd,
        }).then(res => {
            handleLogin(res.data)
        }).catch(err => {
            alert(err.message);
        })
    }

    function handleLogin (data){

        if(data.message === "success"){
            alert("login, success!! \nyou are " + data.result.firstName + " " + data.result.middleName+" !");
            // <CustomerPage />
            navigate('/request/post');
        }
        else {
            alert(data.error)
        }
    }


    return(
        <section className="section">
            <form style={
                    {   
                        border: "2px solid grey", width: "auto", alignItems: "stretch",
                        margin: "0.5rem", padding: "0.5rem 0.5rem", display: "flex", flexDirection: "column",
                        borderRadius: "0.5rem", 
                    }
                }
            >
                <h4 
                    style={
                        {
                            textAlign: "center", justifyContent: "center", display: "flex", flexDirection: "column", margin: "1rem",
                            backgroundColor: "rgba(0,0,0,0.4)", height:"3rem", padding: "1rem", border: "1px solid grey", borderRadius: "0.5rem",
                        }
                    }
                >  
                    Login Form
                </h4>

                <label htmlFor="phoneNumber">Phone Number: </label>
                <input
                    className="logininputs"
                    type = {"tel"}
                    id={"phoneNumber"}
                    required ={true}
                    label = {"Mobile Phone Number"}
                    placeholder = {"0912345678"}
                    variant = {"outlined"}
                    value = {data.phoneNumber}
                    onChange={(e)=>handleFields(e)}
                />
                <label htmlFor="pwd">Login Password: </label>
                <input
                    className="logininputs"
                    type = {"password"}
                    id={"pwd"}
                    required ={true}
                    label = {"password"}
                    placeholder = {"jSsau3A#@"}
                    variant = {"outlined"}
                    value = {data.pwd}
                    onChange={(e)=>handleFields(e)}
                />
            
                <Button
                    className= 'buttons'
                    variant="contained"
                    color = {"primary"}
                    onClick = {(e)=> {
                        handleSubmit(e)
                    }}
                >
                    Log in
                </Button>

                <Button
                    className= 'buttons'
                    variant="outlined"
                    onClick = {(e)=> {
                        navigate('/customer/signup')

                    }}
                >
                   <i>don't have account? </i> <b>Signup</b> 
                </Button>

                <BackButton className= 'buttons'/>
                
            </form>
        </section>
    );
}

export default Login