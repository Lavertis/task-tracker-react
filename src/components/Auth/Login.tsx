import React, {FC, useContext, useState} from 'react';
import {Alert, Button, Col, Form, InputGroup} from "react-bootstrap";
import {AxiosError, AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import {TokenContext} from "../../App";
import useAxios from "../../hooks/useAxios";
import {useFormik} from "formik";
import * as yup from "yup";

const loginValidationSchema = yup.object().shape({
    email: yup.string().email().required().label('Email'),
    password: yup.string().required().label('Password')
});

interface LoginProps {
    redirectTo: string
}

const Login: FC<LoginProps> = ({redirectTo}) => {
    const {setToken} = useContext(TokenContext)
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState("")

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: values => {
            axios.post("auth", values)
                .then((response: AxiosResponse) => {
                    setToken(response.data.jwtToken)
                    localStorage.setItem("jwtToken", response.data.jwtToken)
                    navigate(redirectTo)
                })
                .catch((err: AxiosError) => {
                    if (err.response && err.response.status >= 400 && err.response.status <= 500) {
                        setServerError(err.response.data.message)
                    }
                })
        },
    });

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} xxl={3} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            {serverError && <Alert variant="danger" className="text-center">{serverError}</Alert>}
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="email"
                            name="email"
                            id="inputEmail"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            isValid={formik.touched.email && !formik.errors.email}
                            isInvalid={formik.touched.email && !!formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            name="password"
                            id="inputPassword"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            isInvalid={formik.touched.password && !!formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="d-grid">
                    <Button type="submit" variant="primary">Login</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default Login;