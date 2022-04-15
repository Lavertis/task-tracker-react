import React, {FC} from 'react';
import {Task} from "../../types/Task";
import axios from "../../api/axios";
import {useNavigate} from "react-router-dom";


interface TaskListItemProps {
    task: Task
}

const TaskListItem: FC<TaskListItemProps> = ({task}) => {
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

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const {data: res} = await axios.delete(`tasks/${task._id}`)
            console.log(res)
            navigate("/tasks/user")
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                console.log(error.response.data.message)
            }
        }
    }

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
        <div className={"card my-2"} data-id={task._id}>
            <h5 className="card-header">{dueDateString}</h5>
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <div className="d-flex justify-content-between">
                    <div className="my-auto">
                        {getStatus()}
                    </div>
                    <div>
                        <button className="btn btn-outline-primary me-2" onClick={goToEdit}>Edit task</button>
                        <button className="btn btn-outline-danger" onClick={handleDelete}> Delete task</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskListItem;
