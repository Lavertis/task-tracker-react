import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmationModal from "../../Modals/DeleteConfirmationModal";
import {Accordion, Button, Col} from "react-bootstrap";
import TaskDeadlineCountdown from "./TaskDeadlineCountdown";
import {Task} from "../../../classes/Task";

const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
} as const;

interface TaskListItemProps {
    task: Task
    deleteTask: (id: string) => void
    changeTaskCompletion: (id: string, completed: boolean) => void
}

const TaskListItem: FC<TaskListItemProps> = ({task, deleteTask, changeTaskCompletion}) => {
    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);
    const dueDate = new Date(task.dueDate);

    const changeTaskCompletionHandler = () => {
        changeTaskCompletion(task._id, !task.completed)
    }

    const deleteTaskHandler = () => {
        deleteTask(task._id)
    }

    const getTaskStatus = () => {
        const nowDate = new Date()
        const day = 60 * 60 * 24 * 1000;
        const status = {
            bgColor: '',
            text: ''
        }

        if (task.completed) {
            status.bgColor = 'bg-success';
            status.text = 'Completed';
        } else if (!task.completed && dueDate.getTime() < nowDate.getTime()) {
            status.bgColor = 'bg-orange';
            status.text = 'Overdue';
        } else if (!task.completed && (dueDate.getTime() - nowDate.getTime() < day)) {
            status.bgColor = 'bg-orange';
            status.text = 'Due Soon';
        } else {
            status.bgColor = 'bg-primary';
            status.text = 'Not Completed';
        }
        return <Col xs={11} sm={12} xxl={11} className={status.bgColor + " badge px-3 py-2"}>{status.text}</Col>
    }

    const getTaskPriority = () => {
        const priority = {
            bgColor: '',
            text: ''
        }

        switch (task.priority) {
            case 1:
                priority.bgColor = 'bg-success';
                priority.text = 'Low';
                break;
            case 2:
                priority.bgColor = 'bg-orange';
                priority.text = 'Medium';
                break;
            case 3:
                priority.bgColor = 'bg-danger';
                priority.text = 'High';
                break;
        }
        return <span className={priority.bgColor + " badge rounded-pill px-3 py-2"}>{priority.text} priority</span>
    }

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
                            <h5 className="card-title col-7">
                                {dueDate.toLocaleDateString('en-US', dateOptions)}
                            </h5>
                            <h5 className="card-title">
                                <TaskDeadlineCountdown date={dueDate}/>
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

                            <Link to={`/tasks/edit/${task._id}`}>
                                <Button className="me-2" variant="outline-primary">
                                    <FontAwesomeIcon icon={faEdit}/>
                                </Button>
                            </Link>
                            <Button variant="outline-danger" onClick={showModal}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <DeleteConfirmationModal
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