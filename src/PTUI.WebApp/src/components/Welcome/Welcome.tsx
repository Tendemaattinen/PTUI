import React from 'react';
import {FieldValues, useForm} from "react-hook-form";
import {getSettingsFake, testApiCall} from "./Welcome.module";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";

import globalStyle from '../../assets/styles/globalStyle.module.scss';

function Welcome() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const getUserSettingsFake = async (email: string) => {
        return await getSettingsFake(email);
    }
    
    return(
        <div id={globalStyle.welcomeComponent}>
            <h1>PTUI- Profile tailored user interfaces</h1>
            <h2>About</h2>
            <p>Proof of concept, DI work, about profile tailored userinterface, concept how to tailor 
                user interface according user profile, no user profilization</p>
            <h2>Steps</h2>
            <p>1. Register new user, do not use any real credentials</p>
            <p>2. Login as registered user</p>
            <p>3. Fill preference quiz (link here)</p>
            <p>4. Give rating of customazation on questionnare page (link)</p>
            <p>5. Edit values if needed</p>
            <p>6. Give rating for new customization</p>
            <p>7. Continue cycle if want</p>
            <p>8. Fill google forms</p>
            <br/>
            <h2>Tools for testing</h2>

            <h3>Reset</h3>
            <form onSubmit={handleSubmit(UserInterfaceHelpers.restoreDefaultSettings)}>
                <button>Restore default settings</button>
            </form>
            
        </div>
    );
}

export default Welcome