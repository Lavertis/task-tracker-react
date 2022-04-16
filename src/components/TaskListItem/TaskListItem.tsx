import React, {FC} from 'react';
import {Task} from "../../types/Task";
import {useNavigate} from "react-router-dom";


interface TaskListItemProps {
    task: Task
    deleteTask: (id: string) => void
    markAsCompleted: (id: string) => void
}

const TaskListItem: FC<TaskListItemProps> = ({task, deleteTask, markAsCompleted}) => {
    const navigate = useNavigate()

    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    } as const;
    const dueDate = new Date(task.dueDate);
    const dueDateString = dueDate.toLocaleDateString('en-US', dateOptions);

    const goToEdit = () => {
        navigate(`/tasks/edit/${task._id}`)
    }

    const getStatus = () => {
        const dueDate = new Date(task.dueDate);
        const nowDate = new Date()
        const day = 60 * 60 * 24 * 1000;

        if (task.completed)
            return <span className="badge rounded-pill bg-success px-3 py-2">Completed</span>
        else if (!task.completed && dueDate.getTime() < nowDate.getTime())
            return <span className="badge rounded-pill bg-danger px-3 py-2">Overdue</span>
        else if (!task.completed && (dueDate.getTime() - nowDate.getTime() < day))
            return <span className="badge rounded-pill bg-warning px-3 py-2">Due Soon</span>
        else
            return <span className="badge rounded-pill bg-primary px-3 py-2">In Progress</span>
    }

    return (
        <div className="card my-2" data-id={task._id}>
            <h5 className="card-header">{dueDateString}</h5>
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <div className="d-flex flex-column flex-sm-row justify-content-between">
                    <div className="mb-3 mx-auto mx-sm-0 my-sm-auto">
                        {getStatus()}
                    </div>
                    <div className="mx-auto mx-sm-0">
                        {task.completed ? '' :
                            <button className="btn btn-outline-success me-2" onClick={() => markAsCompleted(task._id)}>
                                <i className="fa-solid fa-check"></i>
                            </button>
                        }
                        <button className="btn btn-outline-primary me-2" onClick={goToEdit}>
                            <i className="fa-solid fa-edit"></i>
                        </button>
                        <button className="btn btn-outline-danger" onClick={() => deleteTask(task._id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskListItem;
