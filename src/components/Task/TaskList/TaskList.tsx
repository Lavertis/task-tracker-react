import React, {FC, useCallback, useEffect, useState} from 'react';
import {Task} from "../../../types/Task";
import TaskListItem from "./TaskListItem";
import {Accordion, Alert, Col, Form, Pagination} from "react-bootstrap";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AxiosError, AxiosResponse} from "axios";
import useAxios from "../../../hooks/useAxios";


interface TaskListProps {
}

const TaskList: FC<TaskListProps> = () => {
    const navigate = useNavigate()
    const axios = useAxios()
    const [searchParams] = useSearchParams();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [page, setPage] = useState<number>(parseInt(searchParams.get('page') ?? '1'));
    const [pageCount, setPageCount] = useState<number>(0);
    const [tasksFetched, setTasksFetched] = useState<boolean>(false);
    const [tasksPerPage] = useState<number>(parseInt(searchParams.get('limit') ?? '10'));
    const [hideCompleted, setHideCompleted] = useState<boolean>(searchParams.get('hideCompleted') === 'true');

    const getTaskListItems = () => {
        if (tasks.length === 0 && tasksFetched) {
            return (
                <Alert variant="primary" className="text-center mb-0">
                    <p className="my-auto fs-4">You have no tasks</p>
                </Alert>
            )
        }
        return tasks.map((task) => {
            return (
                <TaskListItem
                    key={task._id}
                    task={task}
                    deleteTask={deleteTask}
                    changeTaskCompletion={changeTaskCompletion}
                />
            )
        })
    }

    const getPaginationItems = () => {
        const prevPage = () => {
            if (page > 1) {
                setPage(page - 1);
            }
        };

        const nextPage = () => {
            if (page < pageCount) {
                setPage(page + 1);
            }
        };

        if (pageCount === 0) return null
        return (
            <>
                <Pagination.First onClick={() => setPage(1)} disabled={page === 1}/>
                <Pagination.Prev onClick={prevPage} disabled={page === 1}/>
                {[...Array(pageCount)].map((_, index) => {
                    return (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === page}
                            onClick={() => setPage(index + 1)}>{index + 1}
                        </Pagination.Item>
                    )
                })}
                <Pagination.Next onClick={nextPage} disabled={page === pageCount}/>
                <Pagination.Last onClick={() => setPage(pageCount)} disabled={page === pageCount}/>
            </>
        )
    }

    const deleteTask = (id: string) => {
        axios.delete(`/tasks/${id}`)
            .then(() => {
                if (tasks.length === 1 && page > 1)
                    setPage(page - 1);

                fetchTasks();
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

    const fetchTasks = useCallback(() => {
        const url = `tasks/auth/all?page=${page}&limit=${tasksPerPage}&hideCompleted=${hideCompleted}`;
        axios.get(url)
            .then((response: AxiosResponse) => {
                setTasks(response.data.tasks);
                setTasksFetched(true);
                setPageCount(Math.ceil(response.data.totalCount / tasksPerPage));
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [page, tasksPerPage, hideCompleted]);

    useEffect(() => {
        fetchTasks();
        navigate(`?page=${page}&limit=${tasksPerPage}&hideCompleted=${hideCompleted}`);
    }, [page, fetchTasks, navigate, tasksPerPage, hideCompleted]);

    return (
        <>
            <Col xs={11} sm={9} md={8} lg={7} xl={6} xxl={5} className="mx-auto mt-5 mb-4 shadow-sm card p-3">
                <Form.Switch
                    type="checkbox"
                    id="hideCompleted"
                    name="hideCompleted"
                    label="Hide completed tasks"
                    className="my-auto"
                    checked={hideCompleted}
                    onChange={() => {
                        setPage(1);
                        setHideCompleted(!hideCompleted);
                    }}
                />
            </Col>
            <Col xs={11} sm={9} md={8} lg={7} xl={6} xxl={5} className="mx-auto mb-5 shadow-sm">
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
