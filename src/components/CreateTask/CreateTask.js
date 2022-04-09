import React, {useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";


const CreateTask = () => {
    const [data, setData] = useState({
        title: "",
        description: "",
        dueDate: "",
    })
    const [error, setError] = useState("")

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    };

    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data: res} = await axiosPrivate.post("tasks", data)
            console.log(res)
            window.location = "/tasks"
        } catch (error) {
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
                           onChange={handleChange} value={data.title}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea rows="3" name="description" className="form-control" required
                              onChange={handleChange} value={data.description}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input type="date" name="dueDate" className="form-control" required
                           onChange={handleChange} value={data.dueDate}/>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Create Task</button>
                </div>
            </form>
        </div>
    );
}

CreateTask.propTypes = {};

CreateTask.defaultProps = {};

export default CreateTask;
