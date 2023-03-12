import React, {useEffect, useState} from "react";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";
import axios from "axios";


function UserAnswers() {
    
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            return await getUserAnswers();
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (userAnswers.length < 1) {
            return;
        }
    }, [userAnswers])
    
    const getUserAnswers = async () => {
        const url: string = UserInterfaceHelpers.getApiUrlWithApiName("userAnswers");
        let userId: string = UserInterfaceHelpers.getUserId();
        axios.get(url,{
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token") ?? ""
            },
            params: {
                userId: userId,
            }})
            .then(function (response) {
                setUserAnswers(response.data);
            })
            .catch(function(error) {
                alert("Getting user answers from database failed");
                console.log("Error: " + error);
            })
    }

    class UserAnswer {
        question: string;
        answer: string;

        constructor(question: string, answer: string) {
            this.question = question;
            this.answer = answer;
        }
    }
    
    return (
        <div>
            <h3>Your answers</h3>
            {userAnswers.map((answer, index) => {
                return (
                    <div key={index}>
                        <p>{answer.question}: {answer.answer}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default UserAnswers;