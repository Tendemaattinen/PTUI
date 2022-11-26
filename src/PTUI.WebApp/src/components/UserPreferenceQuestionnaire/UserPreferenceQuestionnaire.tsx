import React, {useEffect, useState} from 'react';
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";
import StringHelper from "../../helpers/StringHelper";

import upqStyle from './UserPreferenceQuestionnaire.module.scss';
import {FieldValues, useForm} from "react-hook-form";
import axios from "axios";
import {SettingType} from "../../enums/SettingType";
import {Setting} from "../../interfaces/Setting";
import {SettingValue} from "../../interfaces/SettingValue";

function UserPreferenceQuestionnaire() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const setUserStyle = async (formData: FieldValues) => {
        let style = createStyleJson(formData);
        
        // TODO: Save to db
        //await saveUserSettings(style, formData.navbarLocation);
        
        await UserInterfaceHelpers.setUserStyle(style);
        await UserInterfaceHelpers.setNavbarLocation(formData.navbarLocation);
    }
    
    const saveUserSettings = async (styleSettings: string, navbarLocation: string) => {
        let userId = localStorage.getItem('userId');

        if (userId !== null) {
            try {
                const url: string = process.env.REACT_APP_API_BASE_URL + "setuserpreferences";
                const content: string = JSON.stringify({userId: userId, preferences: styleSettings, navbarLocation: navbarLocation })
                // API call
                await axios.post(url, content, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                .then(function (response) {
                    alert("Settings save");
                })
                .catch(function(error) {
                    console.log("Error: " + error);
                    alert("Saving settings failed, error: " + error.respose)
                })
            }
            catch (error: unknown) {
                // TODO: Error
            }
        }
    }
    
    const createStyleJson = (formData: FieldValues) => {
        let style = { 
            "bg-color": formData.bgColor1,
            "header-color": formData.headerColor1,
            "text-color": formData.textColor1,
            "complementary-color": formData.complementaryColor1,
            "font-family": formData.fontName,
            "font-size-multiplier": formData.fontSize,
            "letter-spacing": formData.letterSpacing,
            "line-height": formData.lineHeight,
            "word-spacing": formData.wordSpacing
        };
        return JSON.stringify(style);
    }
    
    const saveUserRating = async (formData: FieldValues) => {
        let userId = localStorage.getItem('userId');
        if (userId !== null) {
            try {
                const url: string = process.env.REACT_APP_API_BASE_URL + "saverating";
                const content: string = JSON.stringify({userId: userId, rating: formData.rating, reason: formData.ratingReason })
                // API call
                await axios.post(url, content, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(function (response) {
                        alert("Rating saved");
                    })
                    .catch(function(error) {
                        console.log("Error: " + error);
                        alert("Saving rating failed, error: " + error.respose)
                    })
            }
            catch (error: unknown) {
                // TODO: Error
            }
        }
        
    }
    
    const getSettingsFromDB = async () => {
        let settings: Setting[] = [];
        try {
            const url: string = process.env.REACT_APP_API_BASE_URL + "settings";
            // API call
            await axios.get(url,{
                // params: {
                //     'type': '0'
                // }
            })
            .then(function (response) {
                console.log(response);
                settings = response.data;
                setSettings(settings);
            })
            .catch(function(error) {
                console.log("Getting settings from database failed to error: " + error);
            })
        }
        catch (error: unknown) {
            // TODO: Error
        }
        
        return settings;
        
        //return settings.filter(x => x.name === settingName)[0].values;
        
    }
    
    const [settings, setSettings] = useState<Setting[]>([]);
    const [count, setCount] = useState<number>(0);
    
    
    const getSettingValues = (settingName: string, settingType: SettingType = SettingType.Css) => {
        return settings.filter(x => x.name === settingName && x.type === settingType as number)[0]?.values ?? [];
    }
    
    useEffect(() => {
        const fetchData = async () => {
            return await getSettingsFromDB();
        }
        fetchData();
    }, [count])
    
    

    return(
        <div id={upqStyle.upqComponent}>
            <h1>Preference questionnaire</h1>
            <h2>Info</h2>
            <p>Create some kind of info box here. Accordion would be nice solution.</p>
            <div>
                <h2>Rating component</h2>
                <form onSubmit={handleSubmit(saveUserRating)}>
                    <div>
                        <div>
                            <label>Rate current version:&nbsp;</label>
                            <select {...register('rating')}>
                                {Array.from(Array(10).keys()).map(item => {
                                    return (<option key={item} value={item}>{item}</option> )
                                })}
                            </select>
                        </div>
                        <div>
                            <label>Reason for rating:&nbsp;</label>
                            <div>
                                <textarea className={upqStyle.reasonRatingTextArea} {...register('ratingReason')} rows={4} cols={50}></textarea>
                            </div>
                        </div>
                        <div>
                            <input type={"submit"} value={"Submit"}/>
                        </div>
                    </div>
                </form>
            </div>
            
            <h2>Style</h2>
            <form onSubmit={handleSubmit(setUserStyle)} id={upqStyle.upqStyleForm}>
                <h3>Background color</h3>
                <div className={upqStyle.upqStyleFormDivRow}>
                    <label>Color:</label>
                    <select {...register('bgColor1')} id={"bgColorListId"}>
                        {getSettingValues("bg-color").map(item => {
                            return (<option key={item?.value ?? ""} value={item?.value ?? ""}>{item?.name ?? ""}</option> )
                        })}
                    </select>

                </div>
                
                
                <h3>Complementary color</h3>
                <div className={upqStyle.upqStyleFormDivRow}>
                    <label>Color:</label>
                    <select {...register('complementaryColor1')} id={"complementaryColorListId"}>
                        {getSettingValues("complementary-color").map(item => {
                            return (<option key={item.value} value={item.value}>{item.name}</option> )
                        })}
                    </select>
                </div>

                <h3>Header color</h3>
                <div className={upqStyle.upqStyleFormDivRow}>
                    <label>Color:</label>
                    <select {...register('headerColor1')} id={"headerColorSelectId"}>
                        {getSettingValues("header-color").map(item => {
                            return (<option key={item.value} value={item.value}>{item.name}</option> )
                        })}
                    </select>
                </div>
                
                <h3>Text color</h3>
                <div className={upqStyle.upqStyleFormDivRow}>
                    <label>Color:</label>
                    <select {...register('textColor1')} id={"textColorSelectId"}>
                        {getSettingValues("text-color").map(item => {
                            return (<option key={item.value} value={item.value}>{item.name}</option> )
                        })}
                    </select>
                </div>
                
                <h3>Navbar location</h3>
                <div className={upqStyle.upqStyleFormDivRow}>
                    <label>Location:</label>
                    <select {...register('navbarLocation')} id={"navbarLocationSelectId"}>
                        {getSettingValues("navbar-location", SettingType.Navbar).map(item => {
                            return (<option key={item.value} value={item.value}>{item.name}</option> )
                        })}
                    </select>
                </div>

                <h3>Font</h3>
                <div className={upqStyle.upqStyleFormDivRow}>
                    <label>Name:</label>
                    <select {...register('fontName')} id={"fontNameSelectId"}>
                        {getSettingValues("font-family").map(item => {
                            return (<option key={item.value} value={item.value}>{item.name}</option> )
                        })}
                    </select>
                </div>

                <h3>Font size</h3>
                <div className={upqStyle.upqStyleFormDivRow}>
                    <label>Size:</label>
                    <select {...register("fontSize")} id={"fontSizeSelectId"}>
                        {getSettingValues("font-size-multiplier").map(item => {
                            return (<option key={item.value} value={item.value}>{item.name}</option> )
                        })}
                    </select>
                </div>

                <h3>Letter spacing</h3>
                <div className={upqStyle.upqStyleFormDivRow}>
                    <label>Spacing:</label>
                    <select {...register("letterSpacing")}>
                        {getSettingValues("letter-spacing").map(item => {
                            return (<option key={item.value} value={item.value}>{item.name}</option> )
                        })}
                    </select>
                </div>

                <h3>Line height</h3>
                <div className={upqStyle.upqStyleFormDivRow}>
                    <label>Height:</label>
                    <select {...register("lineHeight")}>
                        {getSettingValues("line-height").map(item => {
                            return (<option key={item.value} value={item.value}>{item.name}</option> )
                        })}
                    </select>
                </div>

                <h3>Word spacing</h3>
                <div className={upqStyle.upqStyleFormDivRow}>
                    <label>Spacing:</label>
                    <select {...register("wordSpacing")}>
                        {getSettingValues("word-spacing").map(item => {
                            return (<option key={item.value} value={item.value}>{item.name}</option> )
                        })}
                    </select>
                </div>
                
                <input type={"submit"} value={"Submit"}/>
            </form>
        </div>
    );
}

export default UserPreferenceQuestionnaire;