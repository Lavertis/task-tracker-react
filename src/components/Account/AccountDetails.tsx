import React, {FC, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Col, FloatingLabel, Form} from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import {User} from "../../classes/User";


interface AccountDetailsProps {
}

const AccountDetails: FC<AccountDetailsProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate();
    const [user, setUser] = React.useState<User>(new User())

    useEffect(() => {
        axios.get(`users/auth`)
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {
                console.log(error.response.data.message)
            })
    }, [axios])

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} xxl={3} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Account details</h3>
            <Form>
                <FloatingLabel controlId="inputEmail" label="Email address" className="mb-3">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        disabled
                    />
                </FloatingLabel>
                <FloatingLabel controlId="inputFirstName" label="First name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={user.firstName}
                        disabled
                    />
                </FloatingLabel>
                <FloatingLabel controlId="inputLastName" label="Last name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={user.lastName}
                        disabled
                    />
                </FloatingLabel>
                <Form.Group className="d-grid d-sm-flex justify-content-sm-end mt-4">
                    <Button variant="primary" className="col-sm-4" onClick={() => navigate(`/account/edit`)}>
                        Edit
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default AccountDetails;