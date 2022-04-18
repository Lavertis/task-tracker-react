import React, {FC, useState} from 'react';
import axios from '../../api/axios';
import {useNavigate} from "react-router-dom";
import {Alert, Button, ButtonGroup, Col, Form} from "react-bootstrap";

interface CreateTaskProps {
}

const AddTask: FC<CreateTaskProps> = () => {
    const navigate = useNavigate()
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 1,
        dueDate: ''
    })
    const [error, setError] = useState("")

    const handleTextChange = ({currentTarget: input}: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask({...task, [input.name]: input.value})
    };

    const changePriority = (priority: number) => {
        setTask({...task, priority: priority})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const {data: res} = await axios.post("tasks", task)
            console.log(res)
            navigate("/tasks/user/all")
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
                    <Form.Label htmlFor="inputTitle">Title</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputTitle"
                        name="title"
                        onChange={handleTextChange}
                        value={task.title}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputDescription">Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        id="inputDescription"
                        name="description"
                        onChange={handleTextChange}
                        value={task.description}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputDueDate">Due date</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        id="inputDueDate"
                        name="dueDate"
                        onChange={handleTextChange}
                        value={task.dueDate}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPriority">Priority</Form.Label>
                    <ButtonGroup className="mb-3 d-flex" id="inputPriority">
                        <Button
                            variant="outline-primary"
                            active={task.priority === 1}
                            value={1}
                            onClick={() => changePriority(1)}>
                            Low
                        </Button>
                        <Button
                            variant="outline-primary"
                            active={task.priority === 2}
                            onClick={() => changePriority(2)}>
                            Medium
                        </Button>
                        <Button
                            variant="outline-primary"
                            active={task.priority === 3}
                            onClick={() => changePriority(3)}>
                            High
                        </Button>
                    </ButtonGroup>
                </Form.Group>
                <Form.Group className="d-grid">
                    <Button type="submit" variant="primary">Add Task</Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default AddTask;