import upqStyle from "../UserPreferenceQuestionnaire/UserPreferenceQuestionnaire.module.scss";
import axios from "axios";
import React, {useEffect, useState} from 'react';
import {FieldValues, useForm} from "react-hook-form";
import {useAppSelector} from "../../hooks/hooks";

function Review() {

    const { preferenceType } = useAppSelector((state) => state.preference)
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const saveUserRating = async (formData: FieldValues) => {
        let userId = localStorage.getItem('userId');
        if (userId !== null) {
            try {
                const url: string = process.env.REACT_APP_API_BASE_URL + "saverating";
                const content: string = JSON.stringify({userId: userId, rating: formData.rating, 
                    reason: formData.ratingReason, type: preferenceType })
                // API call
                await axios.post(url, content, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
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
    
    return (
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
    );
}

export default Review;