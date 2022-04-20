import React, {FC, useContext, useState} from 'react';
import axios from "../../api/axios";
import {Alert, Button, Col, Form} from "react-bootstrap";
import {AxiosError, AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import {TokenContext} from "../../App";


interface LoginProps {
    redirectTo: string
}

const Login: FC<LoginProps> = ({redirectTo}) => {
    const [data, setData] = useState({email: "", password: ""})
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const {setToken} = useContext(TokenContext)

    const handleChange = ({currentTarget: input}: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [input.name]: input.value})
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        axios.post("auth", data)
            .then(({data: res}: AxiosResponse) => {
                localStorage.setItem("token", res.data)
                setToken(res.data)
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data}`;
                navigate(redirectTo, {replace: true})
            })
            .catch((err: AxiosError) => {
                if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                    setError(err.response.data.message)
                }
            })
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
