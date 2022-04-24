import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form} from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";

const editTaskValidationSchema = yup.object().shape({
    title: yup.string().required().min(3).max(20).label('Title'),
    description: yup.string().required().max(120).label('Description'),
    priority: yup.number().required().min(1).max(3).label('Priority'),
    dueDate: yup.date().required().label('Due date')
});

interface EditTaskProps {
}

const EditTask: FC<EditTaskProps> = () => {
    const {id} = useParams();
    const axios = useAxios()
    const navigate = useNavigate()
    const [generalError, setGeneralError] = useState("")

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            priority: 0,
            completed: false,
            dueDate: ''
        },
        validationSchema: editTaskValidationSchema,
        onSubmit: async (values) => {
            axios.put(`tasks/${id}`, values)
                .then(() => {
                    navigate(-1)
                })
                .catch(error => {
                    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                        setGeneralError(error.response.data.message)
                    }
                })
        }
    })

    useEffect(() => {
        axios.get(`tasks/${id}`)
            .then(response => {
                response.data.dueDate = moment(response.data.dueDate).format("YYYY-MM-DDTHH:mm")
                formik.setValues(response.data)
            })
            .catch(error => {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    setGeneralError(error.response.data.message)
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios, id]);

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} xxl={3} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            {generalError && <Alert variant="danger" className="text-center">{generalError}</Alert>}
            <Form onSubmit={formik.handleSubmit}>
                <FloatingLabel controlId="inputTitle" label="Title" className="mb-3">
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        isValid={formik.touched.title && !formik.errors.title}
                        isInvalid={formik.touched.title && !!formik.errors.title}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.title}</Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel controlId="inputDescription" label="Description" className="mb-3">
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        isValid={formik.touched.description && !formik.errors.description}
                        isInvalid={formik.touched.description && !!formik.errors.description}
                        style={{height: '100px'}}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
                </FloatingLabel>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputDueDate">Due date</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        id="inputDueDate"
                        name="dueDate"
                        onChange={formik.handleChange}
                        value={formik.values.dueDate}
                        isValid={formik.touched.dueDate && !formik.errors.dueDate}
                        isInvalid={formik.touched.dueDate && !!formik.errors.dueDate}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.dueDate}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPriority">Priority</Form.Label>
                    <ButtonGroup className="mb-3 d-flex" id="inputPriority">
                        <Button
                            variant="outline-primary"
                            name="priority"
                            active={formik.values.priority === 1}
                            onClick={() => formik.setFieldValue('priority', 1)}
                        >
                            Low
                        </Button>
                        <Button
                            variant="outline-primary"
                            name="priority"
                            active={formik.values.priority === 2}
                            onClick={() => formik.setFieldValue('priority', 2)}
                        >
                            Medium
                        </Button>
                        <Button
                            variant="outline-primary"
                            name="priority"
                            active={formik.values.priority === 3}
                            onClick={() => formik.setFieldValue('priority', 3)}
                        >
                            High
                        </Button>
                    </ButtonGroup>
                    <Form.Control.Feedback type="invalid">{formik.errors.priority}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="d-flex justify-content-center">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Completed"
                        className="mb-3"
                        checked={formik.values.completed}
                        onChange={() => formik.setFieldValue('completed', !formik.values.completed)}
                    />
                </Form.Group>
                <Form.Group className="d-grid">
                    <Button variant="success" type="submit" className="mb-2">Save</Button>
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default EditTask;