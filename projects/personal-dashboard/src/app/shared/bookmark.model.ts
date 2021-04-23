import { v4 as uuidv4 } from 'uuid'
export class Bookmark {
    id: string;
    url: URL;

    constructor(public name: string, public urlAsString: string) {
        this.id = uuidv4();
        this.url = new URL(urlAsString);

        if (!name) this.name = this.url.hostname;
    }
}