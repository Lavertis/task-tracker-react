import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form} from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import * as yup from "yup";
import {useFormik} from "formik";
import {SelectOption} from "../../types/select-option";
import Select, {MultiValue} from "react-select";

const editTaskValidationSchema = yup.object().shape({
    title: yup.string().required().min(3).max(50).label('Title'),
    description: yup.string().max(200).label('Description'),
    completed: yup.boolean().required().label('Completed'),
    priority: yup.number().required().min(1).max(3).label('Priority'),
    dueDate: yup.date().required().label("Due Date")
});

interface EditTaskProps {
}

const EditTask: FC<EditTaskProps> = () => {
    const {taskId} = useParams();
    const axios = useAxios()
    const navigate = useNavigate()
    const [generalError, setGeneralError] = useState("")
    const [tags, setTags] = useState<SelectOption[]>([])
    const [selectedTags, setSelectedTags] = useState<MultiValue<SelectOption>>([])

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            priority: 0,
            completed: false,
            dueDate: '',
            tags: new Array<string>()
        },
        validationSchema: editTaskValidationSchema,
        onSubmit: async (values) => {
            values.tags = selectedTags.map((tag: SelectOption) => tag.value)
            axios.patch(`tasks/${taskId}`, values)
                .then(() => {
                    navigate(-1)
                })
                .catch(error => {
                    if (error.response && error.response.status >= 400 && error.response.status < 500)
                        formik.setErrors(error.response.data.errors)
                    else
                        setGeneralError("Internal server error")
                })
        }
    })

    useEffect(() => {
        axios.get(`tasks/${taskId}`)
            .then(response => {
                response.data.dueDate = moment(response.data.dueDate).format("YYYY-MM-DDTHH:mm")
                formik.setValues(response.data)
                setSelectedTags(response.data.tags.map((tag: any) => {
                    return {
                        value: tag.id,
                        label: tag.name
                    }
                }))
            })
            .catch(error => {
                if (error.response && error.response.status === 500) {
                    setGeneralError("Internal server error")
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [axios, taskId]);

    useEffect(() => {
        axios.get('tags')
            .then(response => {
                setTags(response.data.map((tag: any) => {
                    return {
                        value: tag.id,
                        label: tag.name
                    }
                }))
            })
            .catch(() => {
                setGeneralError("Internal server error")
            })
    }, [axios]);

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            <h3 className="mb-4">Update task</h3>
            {generalError && <Alert variant="danger" className="text-center">{generalError}</Alert>}
            <Form onSubmit={formik.handleSubmit} noValidate>
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
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="tags">Tags</Form.Label>
                    <Select
                        isMulti
                        id="tags"
                        name="tags"
                        onChange={setSelectedTags}
                        value={selectedTags}
                        options={tags}
                    />
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