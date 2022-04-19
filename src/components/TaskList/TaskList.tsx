import React, {FC, useEffect, useState} from 'react';
import {Task} from "../../types/Task";
import TaskListItem from "../TaskListItem/TaskListItem";
import axios from "../../api/axios";
import {Accordion, Alert, Col, Pagination} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


interface TaskListProps {
}

const TaskList: FC<TaskListProps> = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(1);
    const tasksPerPage = 10;

    const getTaskListItems = () => {
        if (tasks.length === 0) {
            return (
                <Alert variant="primary" className="text-center">
                    <p className="my-auto fs-4">You have no tasks</p>
                </Alert>
            )
        }
        return tasks.map((task, index) => {
            return (
                <TaskListItem
                    key={index}
                    task={task}
                    deleteTask={deleteTask}
                    changeTaskCompletion={changeTaskCompletion}
                />
            )
        })
    }

    const getPaginationItems = () => {
        const prevPage = () => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        };

        const nextPage = () => {
            if (currentPage < totalNumberOfPages) {
                setCurrentPage(currentPage + 1);
            }
        };

        if (totalNumberOfPages === 1) return null
        return (
            <>
                <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1}/>
                <Pagination.Prev onClick={prevPage} disabled={currentPage === 1}/>
                {[...Array(totalNumberOfPages)].map((_, index) => {
                    return (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => setCurrentPage(index + 1)}>{index + 1}
                        </Pagination.Item>
                    )
                })}
                <Pagination.Next onClick={nextPage}
                                 disabled={currentPage === totalNumberOfPages}/>
                <Pagination.Last onClick={() => setCurrentPage(totalNumberOfPages)}
                                 disabled={currentPage === totalNumberOfPages}/>
            </>
        )
    }

    const deleteTask = (id: string) => {
        axios.delete(`/tasks/${id}`)
            .then(() => {
                const fetchUserTasks = async () => {
                    if (tasks.length === 1 && currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }
                    try {
                        const url = `tasks/auth/all/?page=${currentPage}&limit=${tasksPerPage}`;
                        const response = await axios.get(url);
                        setTasks(response.data.tasks);
                        setTotalNumberOfPages(Math.ceil(response.data.totalCount / tasksPerPage));
                    } catch (err) {
                        console.log(err);
                    }
                }
                fetchUserTasks().then()
            });
    };

    const changeTaskCompletion = (id: string, completed: boolean) => {
        axios.patch(`/tasks/${id}`, {completed: completed})
            .then(() => {
                setTasks(tasks.map(task => {
                    if (task._id === id) {
                        task.completed = completed;
                    }
                    return task;
                }));
            });
    };

    useEffect(() => {
        const fetchUserTasks = async () => {
            try {
                const url = `tasks/auth/all/?page=${currentPage}&limit=${tasksPerPage}`;
                const response = await axios.get(url);
                setTasks(response.data.tasks);
                setTotalNumberOfPages(Math.ceil(response.data.totalCount / tasksPerPage));
                navigate(url)
            } catch (err) {
                console.log(err);
            }
        }

        fetchUserTasks().then();
    }, [currentPage, navigate]);

    return (
        <>
            <Col xs={11} sm={9} md={8} lg={7} xl={6} xxl={5} className="mx-auto mt-5 mb-5">
                <Accordion defaultActiveKey="0" alwaysOpen>
                    {getTaskListItems()}
                </Accordion>
            </Col>
            <Pagination className="mt-auto mb-5 d-flex justify-content-center">
                {getPaginationItems()}
            </Pagination>
        </>
    );
}

export default TaskList;
