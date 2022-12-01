import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {FieldValues, useForm} from "react-hook-form";

import {registerUser} from "../../reducers/userSlice";

import './Register.module.scss';
import axios from "axios";

import registerStyle from './Register.module.scss';
import globalStyle from '../../assets/styles/globalStyle.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

function Register() {
    const {loading, error, success} = useAppSelector(
        (state) => state.user
    )
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const submitForm = (formData:  FieldValues) => {
        if (formData.password !== formData.confirmPassword) {
            alert("Confirm password do not match to password")
            return;
        }

        const firstName: string = "";
        const lastName: string = "";
        const username: string = formData.username;
        const email: string = "";
        const password: string = formData.password;
        dispatch(registerUser({firstName, lastName, username, email, password}));
    }

    useEffect(() => {
        let errorMessageElement = document.getElementById("errorMessage") || undefined;
        if (error !== null && error !== "" && error !== undefined) {
            errorMessageElement!.style!.display = "block";
        }
        errorMessageElement!.style!.display = "none";
    }, [error])
    
    return (
        <div className={registerStyle.registerForm}>
            <h1>Register</h1>
            <div id={"errorMessage"} className={`${globalStyle.message} ${globalStyle.error}`}>{error}</div>
            <div id={"successMessage"} className={`${globalStyle.message} ${globalStyle.success}`} style={{display: success !== false ? 'block' : 'none'}}>{"User registered"}</div>
            <form onSubmit={handleSubmit(submitForm)} className={globalStyle.authForm}>
                <div>
                    <div>
                        <label>
                            Username:
                        </label>
                    </div>
                    <input type={"text"} {...register('username', {required: true})}/>
                    {errors?.username?.type === 'required' && <p className={globalStyle.errorText}>This field is required</p>}
                </div>
                <div>
                    <div>
                        <label>
                            Password:
                        </label>
                    </div>
                    <input type={"password"} {...register('password', {required: true})}/>
                    {errors?.password?.type === 'required' && <p className={globalStyle.errorText}>This field is required</p>}
                </div>
                <div>
                    <div>
                        <label>
                            Confirm password:
                        </label>
                    </div>
                    <input type={"password"} {...register('confirmPassword', {required: true})}/>
                    {errors?.confirmPassword?.type === 'required' && <p className={globalStyle.errorText}>This field is required</p>}
                </div>
                <div>
                    <input type={"submit"} value={"submit"} className={globalStyle.button}/>
                </div>
            </form>
        </div>
    );
}

export default Register