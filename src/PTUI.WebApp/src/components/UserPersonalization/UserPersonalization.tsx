import React, {useEffect, useState} from 'react';
import {FieldValues, useForm} from "react-hook-form";

import personalizationStyle from './UserPersonalization.module.scss'
import globalStyle from "../../assets/styles/globalStyle.module.scss";
import registerStyle from "../Register/Register.module.scss";
import axios from "axios";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";
import style from "./UserPersonalization.module.scss";
import {Question} from "../../interfaces/Question";
import {markQuizDone} from "../../reducers/userSlice";
import {useAppDispatch} from "../../hooks/hooks";

function UserPersonalization() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitAnswerSuccess, setSubmitAnswerSuccess] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            return await getQuestions();
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (questions.length < 1) {
            return;
        }
    }, [questions])
    
    const getQuestions = async () => {
        const url: string = UserInterfaceHelpers.getApiUrlWithApiName("personalizationQuestion");
        axios.get(url,{
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token") ?? ""
            }})
        .then(function (response) {
            setQuestions(response.data);
        })
        .catch(function(error) {
            alert("Getting questions from database failed");
            console.log("Error: " + error);
        })
    }

    const formAnswerObject = async (questionsArray: Array<Question>, formData: FieldValues) => {
        let obj: Record<string, string> = {};
        questionsArray.forEach((question) => {
            obj[question.name] = formData[question.name];
        })
        return obj;
    }

    const submitAnswers = async (formData:  FieldValues) => {
        const url: string = UserInterfaceHelpers.getApiUrlWithApiName("personalization2");
        let object = await formAnswerObject(questions, formData);
        const content: string = JSON.stringify({userId: localStorage.getItem('user') ?? "",
            answers: JSON.stringify(object)});
        
        let data = "";
        await axios.post(url, content, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(function (response) {
                data = JSON.stringify(response.data);
                dispatch(markQuizDone());
                setSubmitAnswerSuccess(true);
            })
            .catch(function(error) {
                console.log("Error: " + error);
            })
    }
    
    return(
        <div>
            <h1>Personalization survey</h1>
            <div id={"successMessage"} className={`${globalStyle.message} ${globalStyle.success}`} style={{display: submitAnswerSuccess ? 'block' : 'none'}}>{"Answers submitted"}</div>
            <form onSubmit={handleSubmit(submitAnswers)} className={globalStyle.authForm}>
                <div className={registerStyle.personalizationSection}>
                    {questions.map((question,index1) => {
                        return (
                            <div key={index1}>
                                <h4>{question.text}</h4>
                                <div className={registerStyle.personalizationRadioRow}>
                                    {question.answers.map((answer,index2) => {
                                        if (answer.image !== null) {
                                            return(
                                                <label key={index2} htmlFor={answer.name}>
                                                    <input {...register(question.name)} type={"radio"} value={answer.name} id={answer.name + index1} defaultChecked={index2 === 0} />
                                                    <span>&nbsp;</span>
                                                    <img src={answer.image} alt={"Times new roman"} className={style.radioImage}/>
                                                    <br/>
                                                </label>
                                            );
                                        }
                                        return(
                                            <label key={index2} htmlFor={answer.name}>
                                                <input {...register(question.name)} type={"radio"} value={answer.name} id={answer.name + index1} defaultChecked={index2 === 0}/>
                                                <span>&nbsp;{answer.text}</span>
                                                <br/>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <input type={"submit"} value={"submit"} className={globalStyle.button}/>
                </div>
            </form>
        </div>
    );
}

export default UserPersonalization;