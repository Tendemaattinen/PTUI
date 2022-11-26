import React from 'react';
import {FieldValues, useForm} from "react-hook-form";
import {getSettingsFake, testApiCall, getUserSettings} from "./Welcome.module";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";

import globalStyle from '../../assets/styles/globalStyle.module.scss';

function Welcome() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitForm = async (formData:  FieldValues) => {
        await tailorUserInterface(formData.email)
    }
    
    // TODO: Move to other place, another file
    const tailorUserInterface = async (email: string) => {
        
        // TODO: Real call to backend
        let settingsJson: string = await getUserSettings();
        let settings: object = JSON.parse(settingsJson);
        await UserInterfaceHelpers.setCssSettingsFromObject(settings);
    }
    
    // TODO: Move to other place, another file
    const tailorUserInterfaceFake = async (formData:  FieldValues) => {
        let settingsJson: string = await getUserSettingsFake(formData.setting);

        await UserInterfaceHelpers.setUserStyle(settingsJson);
    }
    
    const getUserSettingsFake = async (email: string) => {
        return await getSettingsFake(email);
    }
    
    const setSingleCssValueForm = async (formData:  FieldValues) => {
        await UserInterfaceHelpers.setCssValueOfElement(formData.cssParameterName, formData.cssParameterValue)
    }
    
    return(
        <div id={globalStyle.welcomeComponent}>
            <h1>TODO: User guide / information</h1>
            <p>1. Register</p>
            <p>2. Login</p>
            <p>3. Fill preference quiz (link here)</p>
            <p>4. Give rating</p>
            <p>5. Edit if want</p>
            <p>6. New rating</p>
            <p>7. Continue cycle if want</p>
            <p>8. Fill google forms</p>
            <br/>
            <h1>Welcome page</h1>
            <h2>Testing tools</h2>
            
            {/*<h3>Api testing</h3>*/}
            {/*<input type={"button"} value={"Test secure API"} onClick={testApiCall}/>*/}
            {/*<p id={"securedApiText"}></p>*/}

            {/*<h3>User settings</h3>*/}
            {/*<form onSubmit={handleSubmit(submitForm)}>*/}
            {/*    <label>*/}
            {/*        UserId:&nbsp;&nbsp;*/}
            {/*    </label>*/}
            {/*    <input type={"text"} {...register('email')}/>*/}
            {/*    &nbsp;&nbsp;*/}
            {/*    <button>Test change of Ui</button>*/}
            {/*</form>*/}

            <h3>Settigs</h3>
            <form onSubmit={handleSubmit(tailorUserInterfaceFake)}>
                <label>
                    Setting name:&nbsp;&nbsp;
                </label>
                <input type={"text"} {...register('setting')}/>
                &nbsp;&nbsp;
                <button>Get setting</button>
            </form>

            <h3>Navbar</h3>
            <div style={{display: "flex", justifyContent: "center", columnGap: "1em"}}>
                <form onSubmit={handleSubmit(UserInterfaceHelpers.setTopNavbar)}>
                    <button>Top navbar</button>
                </form>
                <form onSubmit={handleSubmit(UserInterfaceHelpers.setLeftNavbar)}>
                    <button>Left navbar</button>
                </form>
                <form onSubmit={handleSubmit(UserInterfaceHelpers.setRightNavbar)}>
                    <button>Right navbar</button>
                </form>
            </div>

            <h3>Single setting</h3>
            <div>
                <form onSubmit={handleSubmit(setSingleCssValueForm)} style={{display: "flex", justifyContent: "center", columnGap: "1em"}}>
                    <input type={"text"} {...register('cssParameterName')}/>
                    <input type={"text"} {...register('cssParameterValue')}/>
                    <button>Edit single css parameter</button>
                </form>
            </div>

            <h3>Reset</h3>
            <form onSubmit={handleSubmit(UserInterfaceHelpers.restoreDefaultSettings)}>
                <button>Restore default settings</button>
            </form>
            
        </div>
    );
}

export default Welcome