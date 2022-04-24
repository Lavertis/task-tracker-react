import React, {FC, useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Alert, Button, Col, FloatingLabel, Form} from "react-bootstrap";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import useAxios from "../../hooks/useAxios";
import {TokenContext} from "../../App";
import {useFormik} from "formik";
import * as yup from "yup";


const accountDetailsEditValidationSchema = yup.object().shape({
    email: yup.string().email().label('Email'),
    password: yup.string().password().label('Password'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').label('Password confirmation'),
    firstName: yup.string().minUppercase(1).min(2).max(50).label('First name'),
    lastName: yup.string().minUppercase(1).min(2).max(50).label('Last name')
});

interface AccountDetailsEditProps {
}

const AccountDetailsEdit: FC<AccountDetailsEditProps> = () => {
    const {setToken} = useContext(TokenContext)
    const axios = useAxios()
    const navigate = useNavigate()
    const [serverError, setGeneralError] = useState("")
    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);

    const handleDelete = () => {
        axios.delete(`users`)
            .then(() => {
                setToken('')
                localStorage.removeItem("jwtToken")
                navigate('/')
            })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
            firstName: '',
            lastName: ''
        },
        validationSchema: accountDetailsEditValidationSchema,
        onSubmit: async (values) => {
            if (!values.email || !values.password || !values.passwordConfirmation || !values.firstName || !values.lastName) {
                setGeneralError("At least one field must be filled")
                return
            }
            axios.post("users", values)
                .then(() => {
                    navigate(-1)
                })
                .catch(error => {
                    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                        setGeneralError(error.response.data.message)
                    }
                })
        },
    });

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            <Form onSubmit={formik.handleSubmit} noValidate>
                {serverError && <Alert variant="danger" className="text-center">{serverError}</Alert>}
                <FloatingLabel controlId="inputEmail" label="Email address" className="mb-3">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        isValid={!!formik.values.email && formik.touched.email && !formik.errors.email}
                        isInvalid={formik.touched.email && !!formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputPassword" label="Password" className="mb-3">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        isValid={!!formik.values.password && formik.touched.password && !formik.errors.password}
                        isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputPasswordConfirmation" label="Password confirmation" className="mb-3">
                    <Form.Control
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Password confirmation"
                        onChange={formik.handleChange}
                        value={formik.values.passwordConfirmation}
                        isValid={!!formik.values.passwordConfirmation && formik.touched.passwordConfirmation && !formik.errors.passwordConfirmation}
                        isInvalid={formik.touched.passwordConfirmation && !!formik.errors.passwordConfirmation}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputFirstName" label="First name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        isValid={!!formik.values.firstName && formik.touched.firstName && !formik.errors.firstName}
                        isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputLastName" label="Last name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        isValid={!!formik.values.lastName && formik.touched.lastName && !formik.errors.lastName}
                        isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
                </FloatingLabel>
                <Form.Group className="mt-5 mt-sm-4 d-grid d-sm-flex justify-content-sm-between">
                    <Button variant="danger" className="col-sm-3 mb-2 mb-sm-0" onClick={showModal}>
                        Delete
                    </Button>
                    <div className="w-100 d-flex flex-column flex-sm-row justify-content-end">
                        <Button type="submit" variant="success" className="col-sm-4 mb-2 mb-sm-0 me-sm-2">
                            Save
                        </Button>
                        <Button variant="secondary" className="col-sm-4" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </div>
                </Form.Group>
            </Form>
            <DeleteConfirmationModal
                title={"Delete confirmation"}
                message={"Are you sure you want to delete your account?"}
                isShown={modalIsShown}
                confirm={handleDelete}
                hide={hideModal}
            />
        </Col>
    );
}

export default AccountDetailsEdit;
