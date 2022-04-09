import React from 'react';
import {axiosPrivate} from "../../config/axios";


const TaskListItem = ({task}) => {
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    const dueDate = new Date(task.dueDate);
    const dueDateString = dueDate.toLocaleDateString('en-US', dateOptions);

    const handleDelete = async (id) => {
        try {
            const {data: res} = await axiosPrivate.delete(`tasks/${id}`)
            console.log(res)
            window.location = "/tasks/user"
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                console.log(error.response.data.message)
            }
        }
    }

    return (
        <div className="card my-2" data-id={task._id}>
            <h5 className="card-header">{dueDateString}</h5>
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary me-2">Edit task</button>
                    <button className="btn btn-outline-danger" onClick={() => handleDelete(task._id)}>
                        Delete task
                    </button>
                </div>
            </div>
        </div>
    );
}

TaskListItem.propTypes = {};

TaskListItem.defaultProps = {};

export default TaskListItem;
