
import React, {useState, useRef, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Button} from 'react-bootstrap';
import BackButton from '../BackButton'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./signup2.css"


const NAME_REGEX = /^([A-z]).{1,24}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^(09(?=.*[0-9])).{8}$/;

const herokuUrl = "https://dispute-mgt-sys-api.herokuapp.com";
const localUrl = "http://localhost:3000";

const Signup2 = () => {
    const nameRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFnName, setValidFnName] = useState(false);
    const [firstNameFocus, setFnFocus] = useState(false);

    const [middleName, setMiddleName] = useState('');
    const [validMnName, setValidMnName] = useState(false);
    const [middleNameFocus, setMnFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLnName, setValidLnName] = useState(false);
    const [lastNameFocus, setLnFocus] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        nameRef.current.focus();
    }, [])
    useEffect(() => {
        setValidFnName(NAME_REGEX.test(firstName));
    }, [firstName])
    useEffect(() => {
        setValidMnName(NAME_REGEX.test(middleName));
    }, [middleName])
    useEffect(() => {
        setValidLnName(NAME_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setValidPhoneNumber(PHONE_REGEX.test(phoneNumber));
    }, [phoneNumber])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, middleName, lastName, phoneNumber, pwd, matchPwd]) 

    

    const handleSubmit = async (e) =>{

        e.preventDefault();
        // if button enabled with JS hack
        const v1 = NAME_REGEX.test(firstName);
        const v2 = NAME_REGEX.test(middleName);
        const v3 = NAME_REGEX.test(lastName);
        const v4 = PHONE_REGEX.test(phoneNumber);
        const v5 = PWD_REGEX.test(pwd);

        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg("Invalid Field Signature !!!");
            return;
        }
        try {
            const response = await axios.post(herokuUrl + "/customer/signup",
                JSON.stringify({ firstName, middleName, lastName, phoneNumber, pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                }
            );
            setSuccess(true);
            setFirstName('');
            setMiddleName('');
            setLastName('');
            setPhoneNumber('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err.response) {
                console.log(err)
                setErrMsg('No Server Response');
                
            } else if (err.response.status === 409) {
                console.log(err)
                setErrMsg('Phone Number is Taken');
                
            } else {
                console.log(err)
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }


    return(
        <>

        {success ? (
            <section >
                <h1>Success!</h1>
                <p>
                    <a href="/customer/login2">Sign In</a>
                </p>
            </section>
        ) : (
            <section >
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h2 style={{ textAlign: "center", border: "2px solid blue"}}>Register</h2>

                <form >
                    <label htmlFor="firstName">
                        First Name:
                        <FontAwesomeIcon icon={faCheck} className={validFnName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validFnName || !firstName ? "hide" : "invalid"} />
                    </label>
                    <input                       
                        required
                        ref={nameRef}
                        type = "text"
                        id={"firstName"}
                        autoComplete="off"
                        label = {"First Name"}
                        placeholder = {"First Name"}
                        variant = {"outlined"}
                        value = {firstName}
                        aria-invalid={validFnName ? "false" : "true"}
                        aria-describedby="fnnote"
                        onChange={(e) => setFirstName(e.target.value)}
                        onFocus={() => setFnFocus(true)}
                        onBlur={() => setFnFocus(false)}

                    />
                    <p note="fnnote" className={firstNameFocus && firstName && !validFnName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <small><i> 2 to 24 characters, and Must be Letters.</i></small>
                    </p>

                    <label htmlFor="middleName">
                        Middle Name:
                        <FontAwesomeIcon icon={faCheck} className={validMnName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMnName || !middleName ? "hide" : "invalid"} />
                    </label>
                    <input                      
                        id= {"middleName"}
                        label = {"Middle Name"}
                        placeholder = {"Middle Name"}
                        variant = {"outlined"}
                        value = {middleName}
                        onChange= {(e)=> setMiddleName(e.target.value)}
                        required
                        type = "text"
                        autoComplete="off"
                        aria-invalid={validMnName ? "false" : "true"}
                        aria-describedby="mnnote"
                        onFocus={() => setMnFocus(true)}
                        onBlur={() => setMnFocus(false)}
                    />
                    <p id="mnnote" className={middleNameFocus && middleName && !validMnName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <small><i> 2 to 24 characters, and Must be Letters.</i></small>
                    </p>

                    <label htmlFor="lastName">
                        Last Name:
                        <FontAwesomeIcon icon={faCheck} className={validLnName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validLnName || !lastName ? "hide" : "invalid"} />
                    </label>
                    <input
                        type = {"text"}
                        id= {"lastName"}
                        label = {"Last Name"}
                        placeholder = {"Last Name"}
                        variant = {"outlined"}
                        value = {lastName}
                        onChange= {(e)=>setLastName(e.target.value)}
                        required
                        autoComplete="off"
                        aria-invalid={validLnName ? "false" : "true"}
                        aria-describedby="lnnote"
                        onFocus={() => setLnFocus(true)}
                        onBlur={() => setLnFocus(false)}
                    />
                    <p id="lnnote" className={lastNameFocus && lastName && !validLnName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <small><i> 2 to 24 characters, and Must be Letters.</i></small>
                    </p>

                    <label htmlFor="phoneNumber">
                        Phone Number:
                        <FontAwesomeIcon icon={faCheck} className={validPhoneNumber ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPhoneNumber || !phoneNumber ? "hide" : "invalid"} />
                    </label>
                    <input  
                        type={"tel"}
                        id= {"phoneNumber"}
                        label = {"Mobile Phone Number"}
                        placeholder = {"0912345678"}
                        variant = {"outlined"}
                        value = {phoneNumber}
                        onChange= {(e)=>setPhoneNumber(e.target.value)}
                        required
                        autoComplete="off"
                        aria-invalid={validPhoneNumber ? "false" : "true"}
                        aria-describedby="phonenote"
                        onFocus={() => setPhoneNumberFocus(true)}
                        onBlur={() => setPhoneNumberFocus(false)}
                    />
                    <p id="phonenote" className={phoneNumberFocus && phoneNumber && !validPhoneNumber ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        must be 10 digits long.<br />
                        Must begin with 09.<br />
                    </p>

                    <label htmlFor="pwd">
                        Create Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type = {"password"}
                        id= {"pwd"}
                        label = {"password"}
                        placeholder = {"jSsau3A#@"}
                        variant = {"outlined"}
                        value = {pwd}
                        onChange= {(e)=>setPwd(e.target.value)}
                        required
                        autoComplete="off"
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>
                    <label htmlFor="matchPwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input
                    
                        type = {"password"}
                        id= {"matchPwd"}
                        label = {"confirmPassword"}
                        placeholder = {"jSsau3A#@"}
                        variant = {"outlined"}
                        value = {matchPwd}
                        onChange= {(e)=>setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                    <div>
                        <Button
                            className= 'buttons'
                            variant = {"contained"}
                            color = {"primary"}
                            onClick = {(e) => {
                                if(pwd !== matchPwd){
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
                                navigate('/customer/login2');
                            }}
                        >
                            Login
                        </Button>
                        
                        <BackButton />
                    </div> 
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <a href="/customer/login2" >Sign In</a>
                        </span>
                    </p>
                </form>
            </section>
        )}
       </>
    );
}
export default Signup2;