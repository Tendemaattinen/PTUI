import {IAnswer} from "./Answer";


export interface IQuestion {
    id: string,
    name: string,
    text: string,
    answers: Array<IAnswer>
}
export class Question implements IQuestion{
    id: string;
    name: string;
    text: string;
    answers: Array<IAnswer>;

    constructor(id: string, name: string, text: string, answers: Array<IAnswer>) {
        this.id = id;
        this.name = name;
        this.text = text;
        this.answers = answers;
    }
}
