import React, {useState} from 'react';
import instance from '../../config/axios';

const Login = () => {
    const [data, setData] = useState({email: "", password: ""})
    const [error, setError] = useState("")

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data: res} = await instance.post("auth", data)
            localStorage.setItem("token", res.data)
            window.location = "/"
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div
            className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 mx-auto my-auto bg-light rounded-3 p-5 shadow">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" required
                           onChange={handleChange} value={data.email}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" required
                           onChange={handleChange} value={data.password}/>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
