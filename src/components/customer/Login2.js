import React, { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "../context/AuthProvider";

import axios from 'axios';
const LOGIN_URL = '/customer/login2';

const herokuUrl = "https://dispute-mgt-sys-api.herokuapp.com";
const localUrl = "http://localhost:3000";

const Login = () => {
    // const { setAuth } = useContext(AuthContext);
    const phoneNumRef = useRef();
    const errRef = useRef();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        phoneNumRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [phoneNumber, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(herokuUrl + "/customer/login",
                JSON.stringify({ phoneNumber, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                   // withCredentials: true
                }
            );
            console.log(JSON.stringify(response.data));
            const accessToken = response.data.accessToken;
            const roles = response.data.roles;
            // setAuth({ phoneNumber, pwd, roles, accessToken });
            setPhoneNumber('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/customer/signup2">Go to Signup</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit} className="forminputs">
                        
                        <input

                            type="text"
                            id="phoneNumber"
                            ref={phoneNumRef}
                            autoComplete="off"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            required
                            className="forminputs"
                        />

                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className="forminputs"
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <a href="/customer/signup2" >Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login
