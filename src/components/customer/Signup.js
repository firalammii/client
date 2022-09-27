
import React, {useState} from "react";
import Axios from "axios";
import {useNavigate} from "react-router-dom";
import { Button} from 'react-bootstrap';
import BackButton from '../BackButton'

import "./signup.css";


const herokuUrl = "https://dispute-mgt-sys-api.herokuapp.com";
const localUrl = "http://localhost:3000";

// const NAME_REGEX = /^[A-z]$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {

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
        Axios.post(herokuUrl + '/customer/signup',{
            firstName: data.firstName,  
            middleName: data.middleName,  
            lastName: data.lastName,  
            phoneNumber: data.phoneNumber,
            pwd: data.pwd,
            
        }).then((res) => {
            console.log(res.data.result.firstName);
            alert("WELCOME " + res.data.result.firstName + " " + res.data.result.middleName +" !");
            navigate("/customer/login");
        }).catch(err => alert(err)
        )
    }


    return(

        <form className= "forminputs" style={{border: "2px solid red", width: 400}}>
            <div>
                First Name: 
            <input
                className="forminputs"
                type = {"text"}
                id={"firstName"}
                label = {"First Name"}
                placeholder = {"First Name"}
                variant = {"outlined"}
                value = {data.firstName}
                onChange={(e) => handleFields(e)}
            />
            </div>
           
           <div>
            Middle Name: 
            <input
                className= "forminputs"
                type = {"text"}
                id= {"middleName"}
                label = {"Middle Name"}
                placeholder = {"middle Name"}
                variant = {"outlined"}
                value = {data.middleName}
                onChange= {(e)=> {console.log(e.target.value);handleFields(e)}}
            />
           </div>
            
            <div>
                Last Name: 
                <input
                className= "forminputs"
                type = {"text"}
                id= {"lastName"}
                label = {"Last Name"}
                placeholder = {"Last Name"}
                variant = {"outlined"}
                value = {data.lastName}
                onChange= {(e)=>handleFields(e)}
            />
            </div>
            
            <div>
                Phone Number: 
                <input
                className= "forminputs"
                type = {"tel"}
                id= {"phoneNumber"}
                label = {"Mobile Phone Number"}
                placeholder = {"0912345678"}
                variant = {"outlined"}
                value = {data.phoneNumber}
                onChange= {(e)=>handleFields(e)}
            />
            </div>
            
            <div>
                Create Password: 
                <input
                className= "forminputs"
                type = {"password"}
                id= {"pwd"}
                label = {"password"}
                placeholder = {"jSsau3A#@"}
                variant = {"outlined"}
                value = {data.pwd}
                onChange= {(e)=>handleFields(e)}
            />
            </div>
            
            <div>
                Confirm Password: 
                <input
                className= "forminputs"
                type = {"password"}
                id= {"matchPwd"}
                label = {"confirmPassword"}
                placeholder = {"jSsau3A#@"}
                variant = {"outlined"}
                value = {data.matchPwd}
                onChange= {(e)=>handleFields(e)}
            />
            </div>
            
            <div>
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
                    color = {"primary"}
                    onMouseOver= {() => <h3>already have one</h3>}
                    onClick = {(e) => {
                        navigate('/customer/login');
                    }}
                >
                    Login
                </Button>
                
                <BackButton className= 'buttons'/>
            </div> 
       </form>
    );
}
export default Signup;