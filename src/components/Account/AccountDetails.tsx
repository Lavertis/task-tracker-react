import React, {FC, useEffect} from 'react';
import {User} from "../../types/User";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Col, Form} from "react-bootstrap";
import useAxios from "../../hooks/useAxios";


interface AccountDetailsProps {
}

const AccountDetails: FC<AccountDetailsProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User>({_id: "", email: "", firstName: "", lastName: "", password: ""})

    const goToEdit = () => {
        navigate(`/account/edit`)
    }

    useEffect(() => {
        axios.get(`users/auth`)
            .then((res: AxiosResponse) => {
                setUser(res.data)
            })
    }, [axios])

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} xxl={3} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        id="inputEmail"
                        name="email"
                        defaultValue={user.email}
                        disabled
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputFirstName">First name</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputFirstName"
                        name="firstName"
                        defaultValue={user.firstName}
                        disabled
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputLastName">Last name</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputLastName"
                        name="lastName"
                        defaultValue={user.lastName}
                        disabled
                    />
                </Form.Group>
                <Form.Group className="d-grid d-sm-flex justify-content-sm-end mt-4">
                    <Button variant="primary" className="col-sm-4" onClick={goToEdit}>
                        Edit
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default AccountDetails;
