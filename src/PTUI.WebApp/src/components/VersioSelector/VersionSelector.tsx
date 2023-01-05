import React, {useEffect} from 'react';
import style from "./VersionSelector.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {FieldValues, useForm} from "react-hook-form";
import {changePreference} from "../../reducers/userSlice";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";

function VersionSelector() {

    const { preferenceType } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    useEffect(() => {
        (document.getElementById('preferenceTypeRadio' + preferenceType) as HTMLInputElement).checked = true;
    }, [preferenceType]);

    const changePreferenceType = async (type: number) => {
        dispatch(changePreference(type));
        console.log(preferenceType);
        let data = await UserInterfaceHelpers.getUserSettings(
            localStorage.getItem('userId') ?? "",
            type);
        console.log(data);
        UserInterfaceHelpers.setUserStyle(JSON.stringify(data));
        // TODO: Change nav bar
        // TODO: Change page selector
        
    }
    
    return (
        <div id={style.versionSelectorDiv}>
            <h2>Choose version: (TODO: Better text)</h2>
            <form id={style.versionSelectorForm}>
                <div id={style.versionSelectorFormDiv}>
                    <label htmlFor={'preferenceTypeRadio0'}>
                        <input id={'preferenceTypeRadio0'} name={'preferenceTypeRadio'} type={"radio"} value={4}
                               onClick={() => changePreferenceType(4)}/>
                        &nbsp;Default
                    </label>
                    <label htmlFor={'preferenceTypeRadio1'}>
                        <input id={'preferenceTypeRadio1'} name={'preferenceTypeRadio'} type={"radio"} value={0}
                               onClick={() => changePreferenceType(0)}/>
                        &nbsp;Version 1 (Bad)
                    </label>
                    <label htmlFor={'preferenceTypeRadio2'}>
                        <input id={'preferenceTypeRadio2'} name={'preferenceTypeRadio'} type={"radio"} value={1}
                               onClick={() => changePreferenceType(1)}/>
                        &nbsp;Version 2 (Average)
                    </label>
                    <label htmlFor={'preferenceTypeRadio3'}>
                        <input id={'preferenceTypeRadio3'} name={'preferenceTypeRadio'} type={"radio"} value={2}
                               onClick={() => changePreferenceType(2)}/>
                        &nbsp;Version 3 (Good)
                    </label>
                </div>
            </form>

            <p>Choose best one (needed?)</p>
            <p>Radio button</p>
            <p>Submit review button</p>

        </div>
    );
}

export default VersionSelector;