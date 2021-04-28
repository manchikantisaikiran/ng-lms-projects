export interface List {
    _id: string;
    title: string;
}

export interface Task extends List {
    listId: string;
    completed: boolean;
}

interface UserDetails {
    _id: string;
    email: string;
}

export interface User {
    user: UserDetails;
    token:string;
}