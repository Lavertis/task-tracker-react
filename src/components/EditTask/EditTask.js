import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";


const EditTask = () => {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState("")

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data: res} = await axiosPrivate.put(`tasks/${id}`, {
                title,
                description,
                dueDate,
                completed
            })
            console.log(res)
            window.location = "/tasks/user"
        } catch (error) {
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
                const response = await axiosPrivate.get(`tasks/${id}`, {
                    signal: controller.signal
                });
                if (isMounted) {
                    const data = response.data
                    console.log(data)
                    setTitle(data.title)
                    setDescription(data.description)
                    let date = new Date(data.dueDate)
                    date = moment(date).format("YYYY-MM-DDTkk:mm")
                    setDueDate(date)
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
    }, [axiosPrivate, id]);

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
                    <textarea rows="3" name="description" className="form-control" required
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

EditTask.propTypes = {};

EditTask.defaultProps = {};

export default EditTask;
