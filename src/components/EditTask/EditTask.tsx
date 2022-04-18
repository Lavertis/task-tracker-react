import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import axios from "../../api/axios";
import {Alert, Button, ButtonGroup, Col, Form} from "react-bootstrap";


interface EditTaskProps {
}

const EditTask: FC<EditTaskProps> = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 0,
        completed: false,
        dueDate: ''
    });
    const [error, setError] = useState("")

    const handleTextChange = ({currentTarget: input}: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask({...task, [input.name]: input.value})
    };

    const changePriority = (priority: number) => {
        setTask({...task, priority: priority})
    }

    const changeCompleted = (completed: boolean) => {
        setTask({...task, completed: completed})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.put(`tasks/${id}`, task)
            navigate("/tasks/user/all")
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        const fetchTask = async () => {
            const response = await axios.get(`tasks/${id}`);
            const data = response.data
            const task = {
                title: data.title,
                description: data.description,
                completed: data.completed,
                priority: data.priority,
                dueDate: moment(data.dueDate).format("YYYY-MM-DDTkk:mm"),
            }
            setTask(task)
        }
        fetchTask().then()
    }, [id]);

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
                <Form.Group className="d-flex justify-content-center">
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Completed"
                        className="mb-3"
                        checked={task.completed}
                        onChange={(e) => changeCompleted(e.target.checked)}
                    />
                </Form.Group>
                <Form.Group className="d-grid">
                    <Button variant="success" type="submit" className="mb-2">Save</Button>
                    <Button variant="secondary" onClick={() => navigate('/tasks/user/all')}>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default EditTask;
