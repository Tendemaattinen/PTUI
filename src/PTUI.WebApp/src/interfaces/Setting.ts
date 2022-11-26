import {ISettingValue} from "./SettingValue";

export interface ISetting {
    id : string;
    name: string;
    definition: string;
    type: number;
    values: ISettingValue[];
}

export class Setting implements ISetting {
    id : string;
    name: string;
    definition: string;
    type: number;
    values: ISettingValue[];

    constructor(id: string, name: string, definition: string, type: string, values: ISettingValue[]) {
        this.id = id;
        this.name = name;
        this.definition = definition;
        this.type = Number(type);
        this.values = values;
    }
}