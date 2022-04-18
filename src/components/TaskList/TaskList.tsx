import React, {FC, useEffect, useState} from 'react';
import {Task} from "../../types/Task";
import TaskListItem from "../TaskListItem/TaskListItem";
import axios from "../../api/axios";
import {Col, Pagination} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


interface TaskListProps {
}

const TaskList: FC<TaskListProps> = () => {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState<number>(1);
    const tasksPerPage = 3;

    const deleteTask = (id: string) => {
        axios.delete(`/tasks/${id}`)
            .then(() => {
                const fetchUserTasks = async () => {
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
            <Col xs={11} sm={9} md={8} lg={7} xl={6} xxl={5} className="mx-auto mt-5 mb-auto">
                {
                    tasks.map(task => (
                        <TaskListItem
                            key={task._id}
                            task={task}
                            deleteTask={deleteTask}
                            changeTaskCompletion={changeTaskCompletion}
                        />
                    ))
                }

            </Col>
            <Pagination className="mt-auto mb-5 d-flex justify-content-center">
                <Pagination.Prev onClick={prevPage} disabled={currentPage === 1}/>
                {
                    Array.from(Array(totalNumberOfPages).keys()).map(number => (
                        <Pagination.Item
                            key={number + 1}
                            active={number + 1 === currentPage}
                            onClick={() => setCurrentPage(number + 1)}>{number + 1}
                        </Pagination.Item>
                    ))
                }
                <Pagination.Next onClick={nextPage} disabled={currentPage === totalNumberOfPages}/>
            </Pagination>
        </>
    );
}

export default TaskList;
