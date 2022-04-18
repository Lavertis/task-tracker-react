import React, {FC, useState} from 'react';
import {Task} from "../../types/Task";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import {Accordion, Button, Col} from "react-bootstrap";
import Countdown from "react-countdown";

interface TaskListItemProps {
    task: Task
    deleteTask: (id: string) => void
    changeTaskCompletion: (id: string, completed: boolean) => void
}

const TaskListItem: FC<TaskListItemProps> = ({task, deleteTask, changeTaskCompletion}) => {
    const navigate = useNavigate()

    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    } as const;
    const dueDate = new Date(task.dueDate);
    const dueDateString = dueDate.toLocaleDateString('en-US', dateOptions);

    const goToEdit = () => {
        navigate(`/tasks/edit/${task._id}`)
    }

    const changeTaskCompletionHandler = () => {
        changeTaskCompletion(task._id, !task.completed)
    }

    const deleteTaskHandler = () => {
        deleteTask(task._id)
    }

    const getTaskStatus = () => {
        const dueDate = new Date(task.dueDate);
        const nowDate = new Date()
        const day = 60 * 60 * 24 * 1000;

        if (task.completed)
            return <Col xs={11} sm={12} xxl={11} className="badge bg-success px-3 py-2">Completed</Col>
        else if (!task.completed && dueDate.getTime() < nowDate.getTime())
            return <Col xs={11} sm={12} xxl={11} className="badge bg-danger px-3 py-2">Overdue</Col>
        else if (!task.completed && (dueDate.getTime() - nowDate.getTime() < day))
            return <Col xs={11} sm={12} xxl={11} className="badge bg-orange px-3 py-2">Due Soon</Col>
        else
            return <Col xs={11} sm={12} xxl={11} className="badge bg-primary px-3 py-2">Not Completed</Col>
    }

    const getTaskPriority = () => {
        switch (task.priority) {
            case 1:
                return <span className="badge rounded-pill bg-success px-3 py-2">Low priority</span>
            case 2:
                return <span className="badge rounded-pill bg-orange px-3 py-2">Medium priority</span>
            case 3:
                return <span className="badge rounded-pill bg-danger px-3 py-2">High priority</span>
        }
    }

    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);

    type timerRendererProps = {
        days: number
        hours: number
        minutes: number
        seconds: number
        completed: boolean
    }
    const timerRenderer = ({days, hours, minutes, seconds, completed}: timerRendererProps) => {
        let str = '';
        if (completed) {
            return str;
        } else {
            if (days > 0) {
                if (days === 1) {
                    str += `${days} day `
                } else {
                    str += `${days} days `
                }
            }
            if (hours > 0) {
                if (hours === 1) {
                    str += `${hours} hour `
                } else {
                    str += `${hours} hours `
                }
            }
            if (days === 0 && hours === 0) {
                str += 'Less than an hour'
            }
            str += ' left'
            return str
        }
    };

    return (
        <>
            <Accordion.Item eventKey={task._id}>
                <Accordion.Header>
                    <div className="d-flex justify-content-between w-100">
                        <Col className="my-auto h5 me-2">{task.title}</Col>
                        <Col xs={6} sm={4} lg={3} className="my-auto me-sm-3 me-xxl-1">{getTaskStatus()}</Col>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    <Col md={12} className="mb-4">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title col-7">{dueDateString}</h5>
                            <h5 className="card-title">
                                <Countdown date={task.dueDate} renderer={timerRenderer}/>
                            </h5>
                        </div>
                        <p className="card-text break-words">{task.description}</p>
                    </Col>

                    <div className="d-flex flex-column flex-sm-row justify-content-between">
                        <Col className="mb-3 mx-auto mx-sm-0 my-sm-auto">
                            {getTaskPriority()}
                        </Col>
                        <div className="mx-auto mx-sm-0">
                            {
                                !task.completed &&
                                <Button className="me-2" variant="outline-success"
                                        onClick={changeTaskCompletionHandler}>
                                    <FontAwesomeIcon icon={faCheck}/>
                                </Button>
                            }
                            <Button className="me-2" variant="outline-primary" onClick={goToEdit}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </Button>
                            <Button variant="outline-danger" onClick={showModal}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <ConfirmationModal
                title={"Delete confirmation"}
                message={"Are you sure you want to delete this task?"}
                isShown={modalIsShown}
                confirm={deleteTaskHandler}
                hide={hideModal}
            />
        </>
    );
}

export default TaskListItem;
