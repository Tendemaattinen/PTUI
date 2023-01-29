import React, {useEffect, useState} from 'react';
import {FieldValues, useForm} from "react-hook-form";

import {userLogin} from "../../reducers/userSlice";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useNavigate} from "react-router-dom";

import styles from './Login.module.scss';
import globalStyle from '../../assets/styles/globalStyle.module.scss';
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";

function Login() {
    const { userName, loading, error } = useAppSelector((state) => state.user)

    const navigate = useNavigate()
    
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const submitForm = (formData:  FieldValues) => {
        const username: string = formData.username;
        const password: string = formData.password;
        dispatch(userLogin({username, password}));
    }
    
    useEffect(() => {
        
        const asyncWrapper = async () => {
            if (userName != null) {
                let versionType: number = Number(await UserInterfaceHelpers.getUserPreferenceFit(UserInterfaceHelpers.getUserId()));
                await UserInterfaceHelpers.setUserPreferencesFromDatabase(UserInterfaceHelpers.getUserId(), versionType)

                navigate('/');
            }
        }
        
        asyncWrapper();
        
    }, [navigate, userName])
    
    useEffect(() => {
        let errorMessageElement = document.getElementById("errorMessageLoginPage") || undefined;
        if (error !== null && error !== "" && error !== undefined) {
            errorMessageElement!.style!.display = "block";
            return;
        }
        errorMessageElement!.style!.display = "none";
    }, [error])

    return (
        <div id={globalStyle.loginComponent}>
            <h1>Login</h1>
            <div id={"errorMessageLoginPage"} className={`${globalStyle.message} ${globalStyle.error}`}>{error}</div>
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