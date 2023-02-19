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
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import SuccessMessage from "../Messages/SuccessMessage/SuccessMessage";
import {useNavigate} from "react-router-dom";

function UserPersonalization() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [display, setDisplay] = useState<string>("none");
    const [displayError, setDisplayError] = useState<string>("none");
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

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

    const submitAnswers = async (formData:  FieldValues) => {
        const url: string = UserInterfaceHelpers.getApiUrlWithApiName("personalization2");
        let object = await formAnswerObject(questions, formData);
        const content: string = JSON.stringify({userId: localStorage.getItem('user') ?? "",
            answers: JSON.stringify(object)});

        let data: string = "";
        setDisplayError("none");
        setDisplay("none");
        await axios.post(url, content, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(async function (response) {
                data = JSON.stringify(response.data);
                dispatch(markQuizDone());
                setDisplay("block");
                navigate('/questionnaire');
            })
            .catch(function(error) {
                console.log("Error: " + error);
                setDisplayError("block")
            })
    }
    
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
    
    return(
        <div>
            <h1>Personalization survey</h1>
            <SuccessMessage display={display} text={"Answers submitted"}/>
            <div id={"errorMessageLoginPage"} className={`${globalStyle.message} ${globalStyle.error}`} style={{display: displayError}}>Submitting survey failed!</div>
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