import axios from "axios";
import UserInterfaceHelpers from "../../helpers/UserInterfaceHelpers";

const baseUrl: string = process.env.REACT_APP_API_BASE_URL?.toString() ?? "";

export const testApiCall = async () => {
    //event.preventDefault();
    const url: string = formUrlAddress("secureTestApi");
    axios.get(url,{
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token") ?? ""
        }})
        .then(function (response) {
            alert("Secured API call works, user is logged in");
        })
        .catch(function(error) {
            alert("Secured API call failed, user is not logged in");
            console.log("Error: " + error);
        })
}

export const getUserSettings = async (userId: string = localStorage.getItem('userId') ?? "") => {
    const url: string = formUrlAddress("getUserPreferences");
    let settings : string = ""
    axios.get(url, {
        headers: {
            'Authorization': "Bearer " + localStorage.getItem("token") ?? "",
            'Content-Type': 'application/json',
        },
        params: {
            tokenUserId: userId,
        }})
        .then(function (response) {
            alert(response);
            settings = response.data;
        })
        .catch(function(error) {
            alert("Getting user settings failed");
            console.log("Error: " + error);
        })
    return settings
}

const formUrlAddress = (apiName: string, baseUrl: string = process.env.REACT_APP_API_BASE_URL?.toString() ?? "") => {
    return baseUrl + apiName;
}

// TODO: Remove
export const getSettingsFake = async (settingsName: string) => {
    let settingsJson : string = "";
    switch (settingsName) {
        case "test1":
            settingsJson = '{"h1-color": "#33B3FF","h2-color": "blue","h3-color": "aqua","h1-size": "2rem",' +
                '"h2-size": "1.75rem","h3-size": "1.5rem","bg-color": "#BCF4FF","btn-bg-color": "#62D4FF"}'
            break;
        case "test2":
            settingsJson = '{"h1-color": "#FF7515","h2-color": "red","h3-color": "tomato","h1-size": "4rem",' +
                '"h2-size": "3rem","h3-size": "2rem","bg-color": "#FFBBAE","btn-bg-color": "#FF8C76"}';
            break;
        case "red":
            settingsJson = '{"h1-color": "#ffecdb","h2-color": "#ffecdb","h3-color": "#ffecdb","h1-size": "2.5rem",' +
                '"h2-size": "2rem","h3-size": "1.75rem","bg-color": "#c0392b","btn-bg-color": "#ffecdb", ' +
                '"btn-color": "#c0392b", "navbar-bg-color": "#ffecdb", "footer-bg-color": "#ffecdb", "font-family": "sans-serif",' +
                '"p-text-color": "#ffecdb"}';
            break;
        case "blue":
            settingsJson = '{"h1-color": "#fefefe","h2-color": "#fefefe","h3-color": "#fefefe","h1-size": "2.5rem",' +
                '"h2-size": "2rem","h3-size": "1.75rem","bg-color": "#3498db","btn-bg-color": "#fefefe", ' +
                '"btn-color": "#3498db", "navbar-bg-color": "#fefefe", "footer-bg-color": "#fefefe", "font-family": "sans-serif",' +
                '"p-text-color": "#fefefe"}';
            break;
        case "bfont":
            settingsJson = '{"h1-size": "4rem", "h2-size": "3rem","h3-size": "2rem"}';
            break;
        case "sfont":
            settingsJson = '{"h1-size": "2rem", "h2-size": "1.75rem","h3-size": "1.5rem"}';
            break;
        case "times font":
            settingsJson = '{"font-family": "Times New Roman, Times, serif"}';
            break;
        default:
            break;
    }
    return settingsJson;
}