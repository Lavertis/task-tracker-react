export interface Task {
    _id: string,
    title: string,
    description: string,
    dueDate: string,
    completed: boolean,
    owner: string,
    assignedTo: Array<string>,
    createdAt: Date,
    updatedAt: Date,
}