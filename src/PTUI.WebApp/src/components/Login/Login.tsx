import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';


import styles from './Login.module.scss';

function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const baseUrl: string = process.env.REACT_APP_API_BASE_URL?.toString() ?? "";
    
    const login = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const url: string = baseUrl + "token";
        const content: string = JSON.stringify({email: email, password: password})

        axios.post(url, content, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(function (response) {
                setEmail("");
                setPassword("");
                alert("User logged in");
            })
            .catch(function(error) {
                console.log("Error: " + error);
            })
    }

    return (
        <>
            <h1>Login page</h1>
            <form onSubmit={(e) => login(e)}>
                <label>
                    Email:
                    <input type={"email"} name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type={"password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <input type={"submit"} value={"submit"} className={styles.loginButtonV2}/>
            </form>
        </>
    );
}

export default Login