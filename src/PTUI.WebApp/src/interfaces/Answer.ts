export interface IAnswer {
    id: string,
    questionId: string,
    name: string,
    text: string,
    image: (null | string)
}

export class Answer implements IAnswer{
    id: string;
    questionId: string;
    name: string;
    text: string;
    image: (null | string);

    constructor(id: string, questionId: string, name: string, text: string, image: (null | string)) {
        this.id = id;
        this.questionId = questionId;
        this.name = name;
        this.text = text;
        this.image = image;
    }
}