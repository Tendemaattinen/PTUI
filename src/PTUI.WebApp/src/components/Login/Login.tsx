import React, {useEffect, useState} from 'react';
import {FieldValues, useForm} from "react-hook-form";

import {userLogin} from "../../reducers/userSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useNavigate} from "react-router-dom";

import styles from './Login.module.scss';
import globalStyle from '../../assets/styles/globalStyle.module.scss';

function Login() {
    const { userInfo, loading, error } = useAppSelector((state) => state.user)

    const navigate = useNavigate()
    
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const submitForm = (formData:  FieldValues) => {
        const username: string = formData.username;
        const password: string = formData.password;
        dispatch(userLogin({username, password}));
    }
    
    useEffect(() => {
        if (userInfo != null) {
            navigate('/');
        }
    }, [navigate, userInfo])
    
    useEffect(() => {
        let errorMessageElement = document.getElementById("errorMessage") || undefined;
        if (error !== null && error !== "" && error !== undefined) {
            errorMessageElement!.style!.display = "block";
        }
        errorMessageElement!.style!.display = "none";
    }, [error])

    return (
        <div id={globalStyle.loginComponent}>
            <h1>Login</h1>
            <div id={"errorMessage"} className={`${globalStyle.message} ${globalStyle.error}`}>{error}</div>
            <form onSubmit={handleSubmit(submitForm)} className={globalStyle.authForm}>
                <div>
                    <div>
                        <label>Username:</label>
                    </div>
                    <input type={"text"} {...register('username', {required: true})} />
                    {errors?.username?.type === 'required' && <p>This field is required</p>}
                </div>
                <div>
                    <div>
                        <label>Password:</label>
                    </div>
                    <input type={"password"} {...register('password', {required: true})}/>
                </div>
                <div>
                    <input type={"submit"} className={globalStyle.button}/>
                </div>
            </form>
        </div>
    );
}

export default Login