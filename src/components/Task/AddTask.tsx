import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Alert, Button, ButtonGroup, Col, FloatingLabel, Form} from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import {useFormik} from "formik";
import * as yup from "yup";
import moment from "moment";
import {SelectOption} from "../../types/select-option";
import Select, {MultiValue} from "react-select";

const addTaskValidationSchema = yup.object().shape({
    title: yup.string().required().min(3).max(50).label('Title'),
    description: yup.string().max(200).label('Description'),
    priority: yup.number().required().min(1).max(3).label('Priority'),
    dueDate: yup.date().required().min(moment().format("YYYY-MM-DD HH:mm")).label('Due date')
});

interface AddTaskProps {
}

const AddTask: FC<AddTaskProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const [generalError, setGeneralError] = useState("")
    const [tags, setTags] = useState<SelectOption[]>([])
    const [selectedTags, setSelectedTags] = useState<MultiValue<SelectOption>>([])

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            priority: 1,
            completed: false,
            dueDate: '',
            tags: new Array<string>()
        },
        validationSchema: addTaskValidationSchema,
        onSubmit: async (values) => {
            values.tags = selectedTags.map((tag: SelectOption) => tag.value)
            axios.post('tasks', values)
                .then(() => {
                    navigate("/tasks/user/all")
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
            <h3 className="mb-4">Add new task</h3>
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
                <Form.Group className="d-grid mt-4">
                    <Button type="submit" variant="primary">Add Task</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default AddTask;