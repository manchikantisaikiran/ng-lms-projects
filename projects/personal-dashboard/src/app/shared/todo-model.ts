import { v4 as uuidv4 } from 'uuid'

export class TodoModel {
    public id: string;
    constructor(public text: string,
        public isCompleted: boolean
    ) {
        this.id = uuidv4()
    }
}

