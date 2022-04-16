import React, {FC, useState} from 'react';
import axios from '../../api/axios';
import {useNavigate} from "react-router-dom";

interface CreateTaskProps {
}

const CreateTask: FC<CreateTaskProps> = () => {
    const navigate = useNavigate()
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 1,
        dueDate: ''
    })
    const [error, setError] = useState("")

    const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({...task, priority: parseInt(e.target.value)})
    }

    const handleTextChange = ({currentTarget: input}: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
        setTask({...task, [input.name]: input.value})
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const {data: res} = await axios.post("tasks", task)
            console.log(res)
            navigate("/tasks/user/all")
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div
            className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-4 col-xxl-3 mx-auto my-auto bg-light rounded-3 p-5 shadow">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" required
                           onChange={handleTextChange} value={task.title}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea rows={3} name="description" className="form-control" required
                              onChange={handleTextChange} value={task.description}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input type="datetime-local" name="dueDate" className="form-control" required
                           onChange={handleTextChange} value={task.dueDate}/>
                </div>
                <div className="mb-3">
                    <label className="form-label d-block">Priority</label>
                    <div className="btn-group d-flex" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="priority" id="radio-priority-1" value={1}
                               autoComplete="off" onChange={handlePriorityChange} checked={task.priority === 1}/>
                        <label className="btn btn-outline-primary" htmlFor="radio-priority-1">Low</label>

                        <input type="radio" className="btn-check" name="priority" id="radio-priority-2" value={2}
                               autoComplete="off" onChange={handlePriorityChange} checked={task.priority === 2}/>
                        <label className="btn btn-outline-primary" htmlFor="radio-priority-2">Medium</label>

                        <input type="radio" className="btn-check" name="priority" id="radio-priority-3" value={3}
                               autoComplete="off" onChange={handlePriorityChange} checked={task.priority === 3}/>
                        <label className="btn btn-outline-primary" htmlFor="radio-priority-3">High</label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Create Task</button>
                </div>
            </form>
        </div>
    );
}

export default CreateTask;