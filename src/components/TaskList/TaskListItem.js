import React from 'react';


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

    return (
        <div className="card my-2" data-id={task._id}>
            <h5 className="card-header">{dueDateString}</h5>
            <div className="card-body">
                <h5 className="card-title">{task.title}</h5>
                <p className="card-text">{task.description}</p>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary me-2">Edit task</button>
                    <button className="btn btn-outline-danger">Delete task</button>
                </div>
            </div>
        </div>
    );
}

TaskListItem.propTypes = {};

TaskListItem.defaultProps = {};

export default TaskListItem;
