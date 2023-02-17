import React from 'react';
import globalStyle from '../../assets/styles/globalStyle.module.scss';
import {useNavigate} from "react-router-dom";

function Welcome() {
    
    const navigate = useNavigate()
    const navigateTo = (path: string) => {
        navigate(path);
    }
    
    return(
        <div id={globalStyle.welcomeComponent}>
            <h1>Instructions</h1>
            <br/>
            <div className={globalStyle.welcomeTextDiv}>
                <ol>
                    <li><p>Start by registering a new user on the <a href="" onClick={() => navigateTo("/register")}>Register page</a></p></li>
                    <ul>
                        <li><p>Username can be anything</p></li>
                        <li><p>Minimum password length is 6 characters</p></li>
                        <li><p>Register the user by pressing the submit button</p></li>
                    </ul>
                    <li><p>After registration, log in as a registered user on the <a href="" onClick={() => navigateTo("/login")}>Login page</a></p></li>
                    <li><p>After logging in, go to the <a href="" onClick={() => navigateTo("/personalization")}>Survey page</a> and fill out the personalization survey</p></li>
                    <ul>
                        <li><p>For each question, choose the option you like best by clicking on the option</p></li>
                        <li><p>Confirm your selections by pressing the submit button</p></li>
                    </ul>
                    <li><p>After submitting the survey, go to the <a href="" onClick={() => navigateTo("/questionnaire")}>Version selection page</a></p></li>
                    <li><p>Try all different versions of personalization by clicking version</p></li>
                    <ul>
                        <li><p>You can test different personalization versions on the <a href="" onClick={() => navigateTo("/exampleContent")}>Testing page</a></p></li>
                        <li><p>If necessary, you can reset the personalization from the Reset settings button in the navigation bar</p></li>
                    </ul>
                    <li><p>After testing all the versions, choose the version that is closest to your survey answers on the <a href="" onClick={() => navigateTo("/questionnaire")}>Version selection page</a></p></li>
                    <ul>
                        <li><p>Confirm your selection by pressing the submit button</p></li>
                    </ul>
                </ol>
            </div>
        </div>
    );
}

export default Welcome