import {Tag} from "../types/tag";

export class Task {
    public id: string;
    public title: string;
    public description: string;
    public tags: Tag[];
    public completed: boolean;
    public priority: number;
    public dueDate: string;
    public userId: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        id?: string,
        title?: string,
        description?: string,
        tags?: Tag[],
        completed?: boolean,
        priority?: number,
        dueDate?: string,
        userId?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id || '';
        this.title = title || '';
        this.description = description || '';
        this.tags = tags || [];
        this.completed = completed || false;
        this.priority = priority || 0;
        this.dueDate = dueDate || '';
        this.userId = userId || '';
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }
}