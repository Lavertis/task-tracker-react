export interface Task {
    _id: string,
    title: string,
    description: string,
    completed: boolean,
    priority: number,
    dueDate: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date,
}