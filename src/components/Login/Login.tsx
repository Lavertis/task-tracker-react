import React, {FC, useState} from 'react';
import axios from "../../api/axios";
import {Alert, Button, Col, Form} from "react-bootstrap";


interface LoginProps {
}

const Login: FC<LoginProps> = () => {
    const [data, setData] = useState({email: "", password: ""})
    const [error, setError] = useState("")

    const handleChange = ({currentTarget: input}: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [input.name]: input.value})
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const {data: res} = await axios.post("auth", data)
            localStorage.setItem("token", res.data)
            window.location.href = "/"
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
                    <Button type="submit" variant="primary">Login</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default Login;
