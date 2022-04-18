import React, {FC, useState} from 'react';
import {Task} from "../../types/Task";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import {Accordion, Button, Col} from "react-bootstrap";

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
            return <span className="badge bg-success px-3 py-2">Completed</span>
        else if (!task.completed && dueDate.getTime() < nowDate.getTime())
            return <span className="badge bg-danger px-3 py-2">Overdue</span>
        else if (!task.completed && (dueDate.getTime() - nowDate.getTime() < day))
            return <span className="badge bg-orange px-3 py-2">Due Soon</span>
        else
            return <span className="badge bg-primary px-3 py-2">Not Completed</span>
    }

    const getTaskPriority = () => {
        switch (task.priority) {
            case 1:
                return <span className="badge rounded-pill bg-primary px-3 py-2">Low priority</span>
            case 2:
                return <span className="badge rounded-pill bg-orange px-3 py-2">Medium priority</span>
            case 3:
                return <span className="badge rounded-pill bg-danger px-3 py-2">High priority</span>
        }
    }

    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);
    
    return (
        <>
            <Accordion.Item eventKey={task._id}>
                <Accordion.Header>
                    <div className="d-flex justify-content-between w-100">
                        <h5 className="my-auto">{task.title}</h5>
                        <span className="me-3">{getTaskStatus()}</span>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    <Col md={8} className="mb-4">
                        <h5 className="card-title">{dueDateString}</h5>
                        <p className="card-text break-words">{task.description}</p>
                    </Col>

                    <div className="d-flex flex-column flex-sm-row justify-content-between">
                        <div className="mb-3 mx-auto mx-sm-0 my-sm-auto">
                            {getTaskPriority()}
                        </div>
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
