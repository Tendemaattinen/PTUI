import React, {useEffect, useState} from 'react';
import style from "./VersionSelector.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {FieldValues, useForm} from "react-hook-form";
import {changePreference} from "../../reducers/userSlice";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";

function VersionSelector() {

    const { preferenceType } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const [prefType, setPrefType] = useState(preferenceType);
    
    useEffect(() => {
        (document.getElementById('preferenceTypeRadio' + preferenceType) as HTMLInputElement).checked = true;
    }, [preferenceType]);
    
    useEffect(() => {
        const asyncWrapper = async () => {
            let userId: string = localStorage.getItem('userId') ?? "";
            //let type = await UserInterfaceHelpers.getUserPreferenceFit(userId);
            (document.getElementById('preferenceTypeRadio' + prefType) as HTMLInputElement).checked = true;
        }
        
        asyncWrapper()
    }, [])

    const changePreferenceType = async (type: number) => {
        dispatch(changePreference(type));
        await UserInterfaceHelpers.setUserPreferenceFit(UserInterfaceHelpers.getUserId(), type);
        await UserInterfaceHelpers.setUserPreferencesFromDatabase(UserInterfaceHelpers.getUserId(), type)
        setPrefType(type);
    }
    
    return (
        <div id={style.versionSelectorDiv}>
            <h2>Select a version</h2>
            <form id={style.versionSelectorForm}>
                <div id={style.versionSelectorFormDiv}>
                    <label htmlFor={'preferenceTypeRadio4'}>
                        <input id={'preferenceTypeRadio4'} name={'preferenceTypeRadio'} type={"radio"} value={4}
                               onClick={() => changePreferenceType(4)}/>
                        &nbsp;Default
                    </label>
                    <label htmlFor={'preferenceTypeRadio0'}>
                        <input id={'preferenceTypeRadio0'} name={'preferenceTypeRadio'} type={"radio"} value={0}
                               onClick={() => changePreferenceType(0)}/>
                        &nbsp;Version 1 (Bad)
                    </label>
                    <label htmlFor={'preferenceTypeRadio1'}>
                        <input id={'preferenceTypeRadio1'} name={'preferenceTypeRadio'} type={"radio"} value={1}
                               onClick={() => changePreferenceType(1)}/>
                        &nbsp;Version 2 (Average)
                    </label>
                    <label htmlFor={'preferenceTypeRadio2'}>
                        <input id={'preferenceTypeRadio2'} name={'preferenceTypeRadio'} type={"radio"} value={2}
                               onClick={() => changePreferenceType(2)}/>
                        &nbsp;Version 3 (Good)
                    </label>
                </div>
            </form>
        </div>
    );
}

export default VersionSelector;