export interface ISettingValue {
    id : string;
    name: string;
    value: string;
    settingId: string;
}

export class SettingValue implements ISettingValue {
    id : string;
    name: string;
    value: string;
    settingId: string;
    constructor(id: string, name: string, value: string, settingId: string) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.settingId = settingId;
    }
}