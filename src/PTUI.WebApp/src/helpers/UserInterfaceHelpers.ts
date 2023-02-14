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
        switch (navbarLocation.toLowerCase()) {
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

    static getComponentPreference = async (userId: string, component: string, preferenceFit: number) => {
        const url: string = UserInterfaceHelpers.formUrlAddress("componentPreference");
        let componentPreference : string = "";
        await axios.get(url, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token") ?? "",
            },
            params: {
                tokenUserId: userId,
                component: component,
                fit: preferenceFit
            }})
            .then(function (response) {
                componentPreference = response.data;
            })
            .catch(function(error) {
                //alert("Getting " + component + " preference failed to error: " + error);
                console.error(error);
            })
        return componentPreference;
    }
    
    static setUserPreferencesFromDatabase = async (userId: string, preferenceType: number) => {
        // CSS preference
        let preferencesJson = await this.getComponentPreference(userId, 'style', preferenceType);
        UserInterfaceHelpers.setUserStyle(JSON.stringify(preferencesJson));

        // Navbar preference
        let navbarLocationPreference = await this.getComponentPreference(userId, 'navbar', preferenceType);
        await UserInterfaceHelpers.setNavbarLocation(navbarLocationPreference);
    }
    
    static getUserPreferenceFit = async (userId: string) => {
        const url: string = UserInterfaceHelpers.formUrlAddress("preferenceFit");
        let preferenceFit : string = "";
        await axios.get(url, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token") ?? "",
            },
            params: {
                tokenUserId: userId,
            }})
            .then(function (response) {
                preferenceFit = response.data;
            })
            .catch(function(error) {
                //alert("Getting preference fit failed to error: " + error);
                console.error(error);
            })
        return preferenceFit;
    }

    static setUserPreferenceFit = async (userId: string, preferenceFit: number) => {
        const url: string = UserInterfaceHelpers.formUrlAddress("preferenceFit");
        const content: string = JSON.stringify({userId: userId, fit: preferenceFit})
        await axios.post(url, content, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("token") ?? "",
            }})
            .then(function (response) {
            })
            .catch(function(error) {
                //alert("Setting preference fit failed to error: " + error);
                console.error(error);
            })
    }

    private static formUrlAddress = (apiName: string, baseUrl: string = process.env.REACT_APP_API_BASE_URL?.toString() ?? "") => {
        return baseUrl + apiName;
    }
    
    static getUserId = () => {
        return localStorage.getItem('userId') ?? "";
    }
    
    static setDefaultSettings = async (userId: (string | null)) => {
        if (userId != null) {
            await this.setUserPreferenceFit(userId, 4);
        }
        
        let preferencesJson = await this.getDefaultCssSettings();
        UserInterfaceHelpers.setUserStyle(JSON.stringify(preferencesJson));

        await UserInterfaceHelpers.setNavbarLocation('top');
    }
    
    static getDefaultCssSettings = async () => {
        const url: string = UserInterfaceHelpers.formUrlAddress("defaultPreference");
        let defaultPreferenceJson : string = "";
        await axios.get(url, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token") ?? "",
            }})
            .then(function (response) {
                defaultPreferenceJson = response.data;
            })
            .catch(function(error) {
                //alert("Getting " + component + " preference failed to error: " + error);
                console.error(error);
            })
        return defaultPreferenceJson;
    }
    
    static getApiUrl = () => {
        return process.env.REACT_APP_API_BASE_URL?.toString() ?? "";
    }
    
    static getApiUrlWithApiName = (apiName: string) => {
        return UserInterfaceHelpers.getApiUrl() + apiName;
    }

    static getIsQuizDone = async (userId: string) => {
        const url: string = UserInterfaceHelpers.formUrlAddress("isQuizDone");
        let defaultValues : boolean = false;
        await axios.get(url, {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token") ?? "",
            },
            params: {
                userId: userId,
            }})
            .then(function (response) {
                defaultValues = response.data;
            })
            .catch(function(error) {
                //alert("Getting " + component + " preference failed to error: " + error);
                console.error(error);
            })
        return defaultValues;
    }
}

export default UserInterfaceHelpers;



