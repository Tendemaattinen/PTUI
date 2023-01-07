import globalStyle from "../assets/styles/globalStyle.module.scss";
import axios from "axios";
import {store} from '../stores/store';

export class UserInterfaceHelpers {
    
    static setCssValueOfElement = async (key: string, value: string, element: HTMLElement = document.querySelector(':root') ?? new HTMLElement()) => {
        element?.style.setProperty('--' + key, value);
    }

    static addClassToElement = async (className: string, elementName: string) => {
        let element: HTMLElement = document.querySelector(elementName) ?? new HTMLElement();
        element.classList.add(className);
    }

    static removeClassFromElement = async (className: string, elementName: string) => {
        let element: HTMLElement = document.querySelector(elementName) ?? new HTMLElement();
        element.classList.remove(className);
    }

    static setCssSettingsFromObject = (settings: object) => {
        let elementRoot : HTMLElement = document.querySelector(':root') ?? new HTMLElement();

        Object.entries(settings).forEach(
            ([key, value]) => this.setCssValueOfElement(key, value, elementRoot)
        );
    }

    static removeAllClasses = async (elementName: string) => {
        let element: HTMLElement = document.querySelector(elementName) ?? new HTMLElement();
        element.className = "";
    }

    static restoreNavbar = async () => {
        await this.addClassToElement(globalStyle.navbar, '#navbar')
    }

    static setTopNavbar = async () => {
        await this.resetNavbar();
        await this.addClassToElement(globalStyle.topNavbar, '#navbar')
    }

    static setLeftNavbar = async () => {
        await this.resetNavbar();
        await this.addClassToElement(globalStyle.leftNavbar, '#navbar')
    }

    static setRightNavbar = async () => {
        await this.resetNavbar();
        await this.addClassToElement(globalStyle.rightNavbar, '#navbar')
    }

    static setNavbarLocation = async (navbarLocation: string) => {
        switch (navbarLocation) {
            case 'top':
                await this.setTopNavbar();
                break;
            case 'left':
                await this.setLeftNavbar();
                break;
            case 'right':
                await this.setRightNavbar();
                break;
            default:
                await this.setTopNavbar();
                break;

        }
    }

    static restoreDefaultSettings = async () => {
        await this.resetNavbar();
        await this.setTopNavbar();
        localStorage.removeItem(process.env.CSS_SETTINGS_LOCAL_VARIABLE_NAME?.toString() ?? "");
        this.setCssSettingsFromObject(JSON.parse(process.env.DEFAULT_CSS_VALUES?.toString() ?? ""));
    }
    
    private static resetNavbar = async () => {
        await this.removeAllClasses("#navbar");
        await this.restoreNavbar()
    }

    static setUserStyle = (settingsJson: string) => {
        const cssSettingName: string = process.env.CSS_SETTINGS_LOCAL_VARIABLE_NAME?.toString() ?? ""

        // Set to local variables
        UserInterfaceHelpers.setAsLocalVariable(cssSettingName, settingsJson);

        // Read from local variables
        let settingsLocalStorage = UserInterfaceHelpers.getLocalVariable(cssSettingName) ?? "";

        let settings: object = JSON.parse(settingsLocalStorage);
        UserInterfaceHelpers.setCssSettingsFromObject(settings);
    }

    private static getLocalVariable = (key: string) => {
        return localStorage.getItem(key);
    }

    private static setAsLocalVariable = (key: string, value: string) => {
        localStorage.setItem(key, value);
    }
    
    static getUserSettings = async (userId: string, preferenceFit: number) => {
        const url: string = UserInterfaceHelpers.formUrlAddress("getUserPreferences");
        let settings : string = "";
        await axios.get(url, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token") ?? "",
            },
            params: {
                tokenUserId: userId,
                fit: preferenceFit
            }})
            .then(function (response) {
                settings = response.data;
            })
            .catch(function(error) {
                alert("Getting user settings failed");
                console.log("Error: " + error);
            })
        return settings;
    }

    private static formUrlAddress = (apiName: string, baseUrl: string = process.env.REACT_APP_API_BASE_URL?.toString() ?? "") => {
        return baseUrl + apiName;
    }
}

export default UserInterfaceHelpers;



