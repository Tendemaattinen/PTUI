import React, {useEffect, useState} from 'react';
import {FieldValues, useForm} from "react-hook-form";

import personalizationStyle from './UserPersonalization.module.scss'
import globalStyle from "../../assets/styles/globalStyle.module.scss";
import {userLogin} from "../../reducers/userSlice";
import registerStyle from "../Register/Register.module.scss";
import axios from "axios";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";
import arialFontImg from "../../assets/images/fonts/Arial.png";
import helveticaImg from "../../assets/images/fonts/Helvetica.png";
import timesImg from "../../assets/images/fonts/Times.png";
import style from "./UserPersonalization.module.scss";
import {Setting} from "../../interfaces/Setting";
import {Question} from "../../interfaces/Question";

function UserPersonalization() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [submitAnswerSuccess, setSubmitAnswerSuccess] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    
    const submitForm = async (formData:  FieldValues) => {
        const url: string = process.env.REACT_APP_API_BASE_URL + "personalization";
        const content: string = JSON.stringify({username: localStorage.getItem('user') ?? "",
            interface: formData.interface , os: formData.os, time: formData.time, element: formData.element,
            colorCharacter: formData.colorCharacter, eyesight: formData.eyesight, font: formData.font})
        
        let data = "";
        // API call
        await axios.post(url, content, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(function (response) {
                data = JSON.stringify(response.data);
            })
            .catch(function(error) {
                console.log("Error: " + error);
            })
    }
    
    const getQuestions = async () => {
        const url: string = process.env.REACT_APP_API_BASE_URL + "personalizationQuestion";
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
        const url: string = process.env.REACT_APP_API_BASE_URL + "personalization2";
        let object = await formAnswerObject(questions, formData);
        // TODO: Check and rename parameters
        // TODO: What if answer is null
        const content: string = JSON.stringify({userId: localStorage.getItem('user') ?? "",
            answers: JSON.stringify(object)})
        let data = "";
        // API call
        await axios.post(url, content, {
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(function (response) {
                data = JSON.stringify(response.data);
                setSubmitAnswerSuccess(true);
            })
            .catch(function(error) {
                console.log("Error: " + error);
            })
    }
    
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
    
    return(
        <div>
            <h1>Personalization</h1>
            <div id={"successMessage"} className={`${globalStyle.message} ${globalStyle.success}`} style={{display: submitAnswerSuccess ? 'block' : 'none'}}>{"Answers submitted"}</div>
            <form onSubmit={handleSubmit(submitAnswers)} className={globalStyle.authForm}>
                <div className={registerStyle.personalizationSection}>
                    <h2>Questions from database</h2>
                    {questions.map((question,index1) => {
                        return (
                            <div key={index1}>
                                <h4>{question.text}</h4>
                                <div className={registerStyle.personalizationRadioRow}>
                                    {question.answers.map((answer,index2) => {
                                        if (answer.image !== null) {
                                            return(
                                                <label key={index2} htmlFor={answer.name}>
                                                    <input {...register(question.name)} type={"radio"} value={answer.name} id={answer.name} defaultChecked={index2 === 0} />
                                                    <span>&nbsp;</span>
                                                    <img src={answer.image} alt={"Times new roman"} className={style.radioImage}/>
                                                </label>
                                            );
                                        }
                                        return(
                                            <label key={index2} htmlFor={answer.name}>
                                                <input {...register(question.name)} type={"radio"} value={answer.name} id={answer.name} defaultChecked={index2 === 0}/>
                                                <span>&nbsp;{answer.text}</span>
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
            
            {/*<form onSubmit={handleSubmit(submitForm)} className={globalStyle.authForm}>*/}
            {/*    <div className={registerStyle.personalizationSection}>*/}
            {/*        <h2>Personalization questions</h2>*/}
            {/*        <div>*/}
            {/*            <h4>Command line or graphical user interface</h4>*/}
            {/*            <div className={registerStyle.personalizationRadioRow}>*/}
            {/*                <label htmlFor={"cmd"}>*/}
            {/*                    <input {...register("interface")} type={"radio"} value={"cmd"} id={"cmd"} />*/}
            {/*                    <span>&nbsp;Command line</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"ui"}>*/}
            {/*                    <input {...register("interface")} type={"radio"} value={"ui"} id={"ui"} />*/}
            {/*                    <span>&nbsp;User interface</span>*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h3>Linux, Mac or Windows</h3>*/}
            {/*            <div className={registerStyle.personalizationRadioRow}>*/}
            {/*                <label htmlFor={"linux"}>*/}
            {/*                    <input {...register("os")} type={"radio"} value={"linux"} id={"linux"} />*/}
            {/*                    <span>&nbsp;Linux</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"mac"}>*/}
            {/*                    <input {...register("os")} type={"radio"} value={"mac"} id={"mac"} />*/}
            {/*                    <span>&nbsp;Mac</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"windows"}>*/}
            {/*                    <input {...register("os")} type={"radio"} value={"windows"} id={"windows"} />*/}
            {/*                    <span>&nbsp;Windows</span>*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h3>Day or night</h3>*/}
            {/*            <div className={registerStyle.personalizationRadioRow}>*/}
            {/*                <label htmlFor={"day"}>*/}
            {/*                    <input {...register("time")} type={"radio"} value={"day"} id={"day"} />*/}
            {/*                    <span>&nbsp;Day</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"night"}>*/}
            {/*                    <input {...register("time")} type={"radio"} value={"night"} id={"night"} />*/}
            {/*                    <span>&nbsp;Night</span>*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h3>Fire, water, earth or air</h3>*/}
            {/*            <div className={registerStyle.personalizationRadioRow}>*/}
            {/*                <label htmlFor={"fire"}>*/}
            {/*                    <input {...register("element")} type={"radio"} value={"fire"} id={"fire"} />*/}
            {/*                    <span>&nbsp;Fire</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"water"}>*/}
            {/*                    <input {...register("element")} type={"radio"} value={"water"} id={"water"} />*/}
            {/*                    <span>&nbsp;Water</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"earth"}>*/}
            {/*                    <input {...register("element")} type={"radio"} value={"earth"} id={"earth"} />*/}
            {/*                    <span>&nbsp;Earth</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"air"}>*/}
            {/*                    <input {...register("element")} type={"radio"} value={"air"} id={"air"} />*/}
            {/*                    <span>&nbsp;Air</span>*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h3>Colorful or boring</h3>*/}
            {/*            <div className={registerStyle.personalizationRadioRow}>*/}
            {/*                <label htmlFor={"colorful"}>*/}
            {/*                    <input {...register("colorCharacter")} type={"radio"} value={"colorful"} id={"colorful"} />*/}
            {/*                    <span>&nbsp;Colorful</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"boring"}>*/}
            {/*                    <input {...register("colorCharacter")} type={"radio"} value={"boring"} id={"boring"} />*/}
            {/*                    <span>&nbsp;Boring</span>*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h3>Eyesight</h3>*/}
            {/*            <div className={registerStyle.personalizationRadioRow}>*/}
            {/*                <label htmlFor={"worst"}>*/}
            {/*                    <input {...register("eyesight")} type={"radio"} value={"worst"} id={"worst"} />*/}
            {/*                    <span>&nbsp;Worst</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"bad"}>*/}
            {/*                    <input {...register("eyesight")} type={"radio"} value={"bad"} id={"bad"} />*/}
            {/*                    <span>&nbsp;Bad</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"average"}>*/}
            {/*                    <input {...register("eyesight")} type={"radio"} value={"average"} id={"average"} />*/}
            {/*                    <span>&nbsp;Average</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"good"}>*/}
            {/*                    <input {...register("eyesight")} type={"radio"} value={"good"} id={"good"} />*/}
            {/*                    <span>&nbsp;Good</span>*/}
            {/*                </label>*/}
            {/*                <label htmlFor={"best"}>*/}
            {/*                    <input {...register("eyesight")} type={"radio"} value={"best"} id={"best"} />*/}
            {/*                    <span>&nbsp;Best</span>*/}
            {/*                </label>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <h3>Font</h3>*/}
            {/*            <label htmlFor={"arialFont"}>*/}
            {/*                <input {...register("font")} type={"radio"} value={"arialFont"} id={"arialFont"} />*/}
            {/*                <span>&nbsp;</span>*/}
            {/*                <img src={arialFontImg} alt={"Arial"} className={style.fontImage}/>*/}
            {/*            </label>*/}
            {/*            <label htmlFor={"timesFont"}>*/}
            {/*                <input {...register("font")} type={"radio"} value={"timesFont"} id={"timesFont"} />*/}
            {/*                <span>&nbsp;</span>*/}
            {/*                <img src={helveticaImg} alt={"Helvetica"} className={style.fontImage}/>*/}
            {/*            </label>*/}
            {/*            <label htmlFor={"helveticaFont"}>*/}
            {/*                <input {...register("font")} type={"radio"} value={"helveticaFont"} id={"helveticaFont"} />*/}
            {/*                <span>&nbsp;</span>*/}
            {/*                <img src={timesImg} alt={"Times new roman"} className={style.fontImage}/>*/}
            {/*            </label>*/}
            {/*        </div>*/}
            {/*        /!*<p>Välit (väljä, tiukka)</p>*!/*/}
            {/*        /!*<p>Hauska, tosinen</p>*!/*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <input type={"submit"} value={"submit"} className={globalStyle.button}/>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    );
}

export default UserPersonalization;