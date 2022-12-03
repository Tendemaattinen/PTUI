import React from 'react';
import axios from "axios";

function Welcome() {

    const baseUrl: string = process.env.REACT_APP_API_BASE_URL?.toString() ?? "";
    
    const getUserInformation = async () => {
        
        const url : string = baseUrl + "getUserInformation"
        
    }

    const testApiCall = async () => {
        //event.preventDefault();

        const url: string = baseUrl + "secureTestApi";

        axios.get(url,{
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token") ?? ""
            }})
            .then(function (response) {
                alert("Secure api call worked");
            })
            .catch(function(error) {
                alert("Secure api call did not work");
            })
    }

    return(
        <>
            <h2>Welcome page</h2>
            <h3>Information about site</h3>

            <input type={"button"} value={"Test secure API"} onClick={testApiCall}/>
            <p id={"securedApiText"}></p>
        </>
    );
}

export default Welcome