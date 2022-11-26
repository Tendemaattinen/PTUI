export class StringHelper {
    static isStringEmpty = (str: string) => {
        return !str.trim();
    }
}

export default StringHelper;