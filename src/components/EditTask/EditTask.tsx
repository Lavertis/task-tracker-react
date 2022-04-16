import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import axios from "../../api/axios";


interface EditTaskProps {
}

const EditTask: FC<EditTaskProps> = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 0,
        completed: false,
        dueDate: ''
    });
    const [error, setError] = useState("")

    const handleTextChange = ({currentTarget: input}: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>) => {
        setTask({...task, [input.name]: input.value})
    }

    const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask({...task, priority: parseInt(e.target.value)})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.put(`tasks/${id}`, task)
            navigate("/tasks/user/all")
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        const fetchTask = async () => {
            const response = await axios.get(`tasks/${id}`);
            const data = response.data
            const task = {
                title: data.title,
                description: data.description,
                completed: data.completed,
                priority: data.priority,
                dueDate: moment(data.dueDate).format("YYYY-MM-DDTkk:mm"),
            }
            setTask(task)
        }
        fetchTask()
    }, [id]);

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
                <div className="mb-3 d-flex justify-content-center">
                    <div className="form-check form-switch">
                        <label className="form-check-label">Completed</label>
                        <input className="form-check-input" type="checkbox" checked={task.completed}
                               onChange={(e) =>
                                   setTask({...task, completed: Boolean(e.target.checked)})}/>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-success mb-2">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => navigate('/tasks/user/all')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTask;
