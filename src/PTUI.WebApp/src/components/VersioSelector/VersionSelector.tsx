import React, {useEffect, useState} from 'react';
import style from "./VersionSelector.module.scss";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {FieldValues, useForm} from "react-hook-form";
import {changePreference} from "../../reducers/userSlice";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";

function VersionSelector() {
    const { preferenceType } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [prefType, setPrefType] = useState(preferenceType);
    
    useEffect(() => {
        const asyncWrapper = async () => {
            await new Promise(f => setTimeout(f, 50));
            let userId: string = localStorage.getItem('userId') ?? "";
            let type = await UserInterfaceHelpers.getUserPreferenceFit(userId);
            setPrefType(Number(type));
        }
        asyncWrapper()
    })

    const changePreferenceType = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.currentTarget.value);
        dispatch(changePreference(value));
        await UserInterfaceHelpers.setUserPreferenceFit(UserInterfaceHelpers.getUserId(), value);
        await UserInterfaceHelpers.setUserPreferencesFromDatabase(UserInterfaceHelpers.getUserId(),value)
        setPrefType(value);
    }

    return (
        <div id={style.versionSelectorDiv}>
            <h2>Select a version</h2>
            <form id={style.versionSelectorForm}>
                <div id={style.versionSelectorFormDiv}>
                    <label htmlFor={'preferenceTypeRadio4'}>
                        <input id={'preferenceTypeRadio4'} name={'preferenceTypeRadio'} type={"radio"} value={4}
                               onChange={(e) => changePreferenceType(e)} checked={prefType === 4}/>
                        &nbsp;Default
                    </label>
                    <label htmlFor={'preferenceTypeRadio0'}>
                        <input id={'preferenceTypeRadio0'} name={'preferenceTypeRadio'} type={"radio"} value={0}
                               onChange={(e) => changePreferenceType(e)} checked={prefType === 0}/>
                        &nbsp;Version 1
                    </label>
                    <label htmlFor={'preferenceTypeRadio1'}>
                        <input id={'preferenceTypeRadio1'} name={'preferenceTypeRadio'} type={"radio"} value={1}
                               onChange={(e) => changePreferenceType(e)} checked={prefType === 1}/>
                        &nbsp;Version 2
                    </label>
                    <label htmlFor={'preferenceTypeRadio2'}>
                        <input id={'preferenceTypeRadio2'} name={'preferenceTypeRadio'} type={"radio"} value={2}
                               onChange={(e) => changePreferenceType(e)} checked={prefType === 2}/>
                        &nbsp;Version 3
                    </label>
                </div>
            </form>
        </div>
    );
}

export default VersionSelector;