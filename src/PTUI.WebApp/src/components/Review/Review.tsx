import upqStyle from "../UserPreferenceQuestionnaire/UserPreferenceQuestionnaire.module.scss";
import axios from "axios";
import React, {useEffect, useState} from 'react';
import {FieldValues, useForm} from "react-hook-form";
import {useAppSelector} from "../../hooks/hooks";
import globalStyle from "../../assets/styles/globalStyle.module.scss";

function Review() {

    const { preferenceType } = useAppSelector((state) => state.preference)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitBestSuitedSuccess, setSubmitBestSuitedSuccess] = useState<boolean>(false);
    
    const saveUserBestSuitedAnswer = async (formData: FieldValues) => {
        let userId = localStorage.getItem('userId');
        if (userId !== null) {
            try {
                const url: string = process.env.REACT_APP_API_BASE_URL + "saveBestSuitedAnswer";
                const content: string = JSON.stringify({userId: userId, bestSuitedVersion: formData.bestSuitedVersion})
                // API call
                console.log(url);
                console.log(content);
                await axios.post(url, content, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(function (response) {
                        setSubmitBestSuitedSuccess(true);
                    })
                    .catch(function(error) {
                        console.log("Error: " + error);
                        alert("Saving answer failed, error: " + error.respose)
                    })
            }
            catch (error: unknown) {
                // TODO: Error
            }
        }
    }
    
    return (
        <div>
            <h3>Choose the version that is closest to your survey answers</h3>
            <div id={"successMessage"} className={`${globalStyle.message} ${globalStyle.success}`} style={{display: submitBestSuitedSuccess ? 'block' : 'none'}}>{"Answer submitted"}</div>
            <form onSubmit={handleSubmit(saveUserBestSuitedAnswer)}>
                <div>
                    <label>Selection:&nbsp;</label>
                    <select {...register('bestSuitedVersion')}>
                        {Array.from(Array(3).keys()).map(item => {
                            return (<option key={item} value={item}>Version {item + 1}</option> )
                        })}
                    </select>
                    <div>
                        <br/>
                        <input type={"submit"} value={"Submit"}/>
                    </div>
                </div>
            </form>
            
            {/*<h2>Rating component</h2>*/}
            {/*<form onSubmit={handleSubmit(saveUserRating)}>*/}
            {/*    <div>*/}
            {/*        <div>*/}
            {/*            <label>Rate current version:&nbsp;</label>*/}
            {/*            <select {...register('rating')}>*/}
            {/*                {Array.from(Array(10).keys()).map(item => {*/}
            {/*                    return (<option key={item} value={item}>{item}</option> )*/}
            {/*                })}*/}
            {/*            </select>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <label>Reason for rating:&nbsp;</label>*/}
            {/*            <div>*/}
            {/*                <textarea className={upqStyle.reasonRatingTextArea} {...register('ratingReason')} rows={4} cols={50}></textarea>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <input type={"submit"} value={"Submit"}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    );
}

export default Review;