import React, { useState } from 'react';

import './Register.module.scss';
import axios from "axios";

function Register() {
    // Init states
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    
    const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!(await validateForm())) {
            return false;
        }
        const url: string = process.env.REACT_APP_API_BASE_URL + "register";
        const content: string = JSON.stringify(await newRegisterObject())
        
        axios.post(url, content, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(function (response) {
                emptyForm();
                alert("User registered");
            })
            .catch(function(error) {
                console.log("Error: " + error);
            })
    }
    
    const emptyForm = () => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }
    
    const validateForm = async() => {
        if (password != confirmPassword) {
            alert("Password mismatch!");
            return false;
        }
        return true;
        
        // TODO: Additional validation
        // Password length
        // Email is email
        // Username is not in use
        // Email is not in use
    }
    
    const newRegisterObject = async () => {
        return {
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        }
    }
    
    return (
        <>
            <h1>Register page</h1>
            <form onSubmit={(e) => registerUser(e)}>
                <label>
                    First name:
                    <input type={"text"} name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </label>
                <label>
                    Last name:
                    <input type={"text"} name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </label>
                <label>
                    Username:
                    <input type={"text"} name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input type={"email"} name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    Password:
                    <input type={"password"} name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <label>
                    Confirm password:
                    <input type={"password"} name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </label>
                <input type={"submit"} value={"submit"}/>
            </form>
        </>
    );
}

export default Register