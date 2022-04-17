import React, {FC, useEffect} from 'react';
import {User} from "../../types/User";
import axios from "../../api/axios";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";


interface AccountDetailsProps {
}

const AccountDetails: FC<AccountDetailsProps> = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User>({_id: "", email: "", firstName: "", lastName: "", password: ""})

    const goToEdit = () => {
        navigate(`/account/edit`)
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        const id = token ? JSON.parse(atob(token.split('.')[1]))._id : null;

        axios.get(`users/${id}`)
            .then((res: AxiosResponse) => {
                setUser(res.data)
            })
    }, [])

    return (
        <div
            className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3 mx-auto my-auto bg-light rounded-3 p-5 shadow">
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" disabled defaultValue={user.email}/>
            </div>
            <div className="mb-3">
                <label className="form-label">First name</label>
                <input type="text" name="firstName" className="form-control" disabled defaultValue={user.firstName}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Last name</label>
                <input type="text" name="lastName" className="form-control" disabled defaultValue={user.lastName}/>
            </div>
            <div className="d-grid d-sm-flex justify-content-sm-end mt-4">
                <button type="submit" className="btn btn-primary col-sm-4" onClick={goToEdit}>
                    Edit
                </button>
            </div>
        </div>
    );
}

export default AccountDetails;
