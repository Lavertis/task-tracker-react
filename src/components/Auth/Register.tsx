import React, {FC, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Alert, Button, Col, Form, InputGroup} from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import YupPassword from 'yup-password'
import {useFormik} from "formik";
import {AxiosError} from "axios";

YupPassword(yup);

const registerValidationSchema = yup.object().shape({
    email: yup.string().email().required().label('Email'),
    password: yup.string().password().required().label('Password'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required().label('Password confirmation'),
    firstName: yup.string().required().minUppercase(1).min(2).max(50).label('First name'),
    lastName: yup.string().required().minUppercase(1).min(2).max(50).label('Last name'),
});

interface RegisterProps {
}

const Register: FC<RegisterProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverError, setServerError] = useState("")

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            lastName: ''
        },
        validationSchema: registerValidationSchema,
        onSubmit: values => {
            axios.post("users", values)
                .then(() => {
                    navigate("/login")
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
                    <Form.Text id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPasswordConfirmation">Password confirmation</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            name="passwordConfirmation"
                            id="inputPasswordConfirmation"
                            onChange={formik.handleChange}
                            value={formik.values.passwordConfirmation}
                            isInvalid={formik.touched.passwordConfirmation && !!formik.errors.passwordConfirmation}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.passwordConfirmation}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputFirstName">First name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="firstName"
                            id="inputFirstName"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                            isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.firstName}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="inputLastName">Last name</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="lastName"
                            id="inputLastName"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                            isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.lastName}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="d-grid">
                    <Button type="submit" variant="primary">Register</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default Register;