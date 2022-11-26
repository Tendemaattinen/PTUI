import globalStyle from "../assets/styles/globalStyle.module.scss";

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

    static setCssSettingsFromObject = async (settings: object) => {
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
        await this.setCssSettingsFromObject(JSON.parse(process.env.DEFAULT_CSS_VALUES?.toString() ?? ""));
    }
    
    private static resetNavbar = async () => {
        await this.removeAllClasses("#navbar");
        await this.restoreNavbar()
    }

    static setUserStyle = async (settingsJson: string) => {
        const cssSettingName: string = process.env.CSS_SETTINGS_LOCAL_VARIABLE_NAME?.toString() ?? ""

        // Set to local variables
        await UserInterfaceHelpers.setAsLocalVariable(cssSettingName, settingsJson);

        // Read from local variables
        let settingsLocalStorage = await UserInterfaceHelpers.getLocalVariable(cssSettingName) ?? "";

        let settings: object = JSON.parse(settingsLocalStorage);
        await UserInterfaceHelpers.setCssSettingsFromObject(settings);
    }

    private static getLocalVariable = async (key: string) => {
        return localStorage.getItem(key);
    }

    private static setAsLocalVariable = async (key: string, value: string) => {
        localStorage.setItem(key, value);
    }
}

export default UserInterfaceHelpers;



