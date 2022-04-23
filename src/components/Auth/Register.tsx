import React, {FC, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Alert, Button, Col, Form} from "react-bootstrap";
import useAxios from "../../hooks/useAxios";


interface RegisterProps {
}

const Register: FC<RegisterProps> = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const axios = useAxios()
    const navigate = useNavigate()

    const handleChange = ({currentTarget: input}: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [input.name]: input.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const {data: res} = await axios.post("users", data)
            navigate("/login")
            console.log(res.message)
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} xxl={3} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        id="inputEmail"
                        onChange={handleChange}
                        value={data.email}
                        aria-describedby="emailHelp"
                        required
                    />
                    <Form.Text id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputFirstName">First name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        id="inputFirstName"
                        onChange={handleChange}
                        value={data.firstName}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputLastName">Last name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        id="inputLastName"
                        onChange={handleChange}
                        value={data.lastName}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        id="inputPassword"
                        onChange={handleChange}
                        value={data.password}
                        required
                    />
                </Form.Group>
                <Form.Group className="d-grid">
                    <Button type="submit" variant="primary">Register</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default Register;
