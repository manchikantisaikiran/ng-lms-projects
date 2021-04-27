export interface List {
    _id: string;
    title: string;
}

export interface Task extends List {
    listId: string;
    completed: boolean;
}