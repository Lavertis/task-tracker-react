import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import axios from "../../api/axios";


interface EditTaskProps {
}

const EditTask: FC<EditTaskProps> = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const {data: res} = await axios.put(`tasks/${id}`, {
                title,
                description,
                dueDate,
                completed
            })
            console.log(res)
            navigate("/tasks/user")
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchTask = async () => {
            try {
                const response = await axios.get(`tasks/${id}`, {
                    signal: controller.signal
                });
                if (isMounted) {
                    const data = response.data
                    console.log(data)
                    setTitle(data.title)
                    setDescription(data.description)
                    const date = new Date(data.dueDate)
                    const dateStr = moment(date).format("YYYY-MM-DDTkk:mm")
                    setDueDate(dateStr)
                    setCompleted(data.completed)
                }
            } catch (err) {

            }
        }

        fetchTask()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [id]);

    return (
        <div
            className="col-11 col-sm-8 col-md-6 col-lg-4 col-xl-4 col-xxl-3 mx-auto my-auto bg-light rounded-3 p-5 shadow">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" required
                           onChange={(e) => setTitle(e.target.value)} value={title}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea rows={3} name="description" className="form-control" required
                              onChange={(e) => setDescription(e.target.value)} value={description}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input type="datetime-local" name="dueDate" className="form-control" required
                           onChange={(e) => setDueDate(e.target.value)} value={dueDate}/>
                </div>
                <div className="form-check form-switch mb-3">
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Completed</label>
                    <input className="form-check-input" type="checkbox"
                           onChange={(e) => setCompleted(e.target.checked)} checked={completed}/>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-success mb-2">Save</button>
                    <button className="btn btn-secondary" type="button" onClick={() => navigate('/tasks/user')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTask;
