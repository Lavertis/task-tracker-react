import React, {FC, useEffect, useState} from 'react';
import {User} from "../../types/User";
import axios from "../../api/axios";
import {AxiosResponse} from "axios";
import {logout} from "../../helpers/logout";
import {useNavigate} from "react-router-dom";


interface AccountDetailsEditProps {
}

const AccountDetailsEdit: FC<AccountDetailsEditProps> = () => {
    const navigate = useNavigate()
    const [currentData, setCurrentData] = useState<User>({
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    })
    const [newData, setNewData] = React.useState<User>({_id: "", email: "", firstName: "", lastName: "", password: ""})
    const [error, setError] = useState("")

    const handleTextChange = ({currentTarget: input}: React.FormEvent<HTMLInputElement>) => {
        setNewData({...newData, [input.name]: input.value})
    }

    const handleDelete = () => {
        axios.delete(`/users/${currentData._id}`)
            .then((response: AxiosResponse) => {
                console.log(response)
                logout()
            })
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.patch("users", newData)
            navigate("/account")
            console.log(response.data)
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        const id = token ? JSON.parse(atob(token.split('.')[1]))._id : null;

        axios.get(`users/${id}`)
            .then((res: AxiosResponse) => {
                setCurrentData(res.data)
            })
    }, [])

    return (
        <div
            className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 mx-auto my-auto bg-light rounded-3 p-5 shadow">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" placeholder={currentData.email}
                           onChange={handleTextChange} value={newData.email}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">First name</label>
                    <input type="text" name="firstName" className="form-control" placeholder={currentData.firstName}
                           onChange={handleTextChange} value={newData.firstName}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Last name</label>
                    <input type="text" name="lastName" className="form-control" placeholder={currentData.lastName}
                           onChange={handleTextChange} value={newData.lastName}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" required
                           onChange={handleTextChange} value={newData.password}/>
                </div>
                <div className="mt-5 mt-sm-4 d-grid d-sm-flex justify-content-sm-around">
                    <button type="button" className="btn btn-danger col-sm-3 mb-2 mb-sm-0" onClick={handleDelete}>
                        Delete
                    </button>
                    <button type="button" className="btn btn-success col-sm-3 mb-2 mb-sm-0" onClick={handleSave}>
                        Save
                    </button>
                    <button type="button" className="btn btn-secondary col-sm-3" onClick={() => navigate('/account')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AccountDetailsEdit;
