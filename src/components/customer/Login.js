import React, {useState} from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap';
import BackButton from "../BackButton";

const Login = () =>{

    let navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        pwd: "",
    })

    function handleFields(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    function handleSubmit(e){
        const herokuUrl = "https://dispute-mgt-sys-api.herokuapp.com";
        const localUrl = "http://localhost:3000";
        e.preventDefault();
        axios.post(herokuUrl + '/customer/login',{
            phoneNumber: data.phoneNumber,
            pwd: data.pwd,
        }).then(res=>{
            handleLogin(res.data)
        }).catch(err=>{
            alert(err);
        })
    }

    function handleLogin (data){

        if(data.message === "success"){
            alert("login,  success!! \nyou are" + data.result.firstName+" "+ data.result.middleName+" !");
            navigate('/request/post');
        }
        else {
            alert(data.message)
        }
    }


    return(
        
        <form className= "forminputs">
            <input
                className="forminputs"
                type = {"tel"}
                id={"phoneNumber"}
                required ={true}
                label = {"Mobile Phone Number"}
                placeholder = {"0912345678"}
                variant = {"outlined"}
                value = {data.phoneNumber}
                onChange={(e)=>handleFields(e)}
            />

            <input
                className="forminputs"
                type = {"password"}
                id={"pwd"}
                required ={true}
                label = {"password"}
                placeholder = {"jSsau3A#@"}
                variant = {"outlined"}
                value = {data.pwd}
                onChange={(e)=>handleFields(e)}
            />
            <div>
                <Button
                    className= 'buttons'
                    variant = {"contained"}
                    color = {"primary"}
                    onClick = {(e)=> {
                        handleSubmit(e)
                    }}
                >
                    Log in
                </Button>

                <Button
                    className= 'buttons'
                    label= {'new user?'}
                    onClick = {(e)=> {
                        navigate('/customer/signup')

                    }}
                >
                    Signup
                </Button>

                <BackButton className= 'buttons'/>
            </div>
        </form>
    );
}

export default Login