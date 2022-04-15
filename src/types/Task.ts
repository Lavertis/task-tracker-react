export interface Task {
    _id: string,
    title: string,
    description: string,
    dueDate: string,
    completed: boolean,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
}