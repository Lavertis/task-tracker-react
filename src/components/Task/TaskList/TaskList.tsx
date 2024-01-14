import React, {FC, useCallback, useEffect, useState} from 'react';
import TaskListItem from "./TaskListItem";
import {Accordion, Alert, Col, Form, Pagination} from "react-bootstrap";
import {useNavigate, useSearchParams} from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import {Task} from "../../../classes/Task";


interface TaskListProps {
}

const TaskList: FC<TaskListProps> = () => {
    const axios = useAxios()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const [page, setPage] = useState<number>(parseInt(searchParams.get('page') ?? '1'));
    const [tasksPerPage, setTasksPerPage] = useState<number>(parseInt(searchParams.get('tasksPerPage') ?? '10'));
    const [hideCompleted, setHideCompleted] = useState<boolean>(searchParams.get('hideCompleted') === 'true');
    const [searchTitle, setSearchTitle] = useState<string>(searchParams.get('searchTitle') ?? '');

    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksFetched, setTasksFetched] = useState<boolean>(false);
    const [pageCount, setPageCount] = useState<number>(0);

    const getTaskListItems = () => {
        if (tasks.length === 0 && tasksFetched) {
            return (
                <Alert variant="primary" className="text-center mb-0">
                    <p className="my-auto fs-4">No tasks to show</p>
                </Alert>
            )
        }
        return tasks.map((task) => {
            return (
                <TaskListItem
                    key={task.id}
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

        if (pageCount === 0) return ''
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

    const deleteTask = (taskId: string) => {
        axios.delete(`/tasks/${taskId}`)
            .then(() => {
                if (tasks.length === 1 && page > 1)
                    setPage(page - 1);
                fetchTasks();
            })
            .catch(error => {
                console.log(error.error.response.data);
            })
    };

    const changeTaskCompletion = (taskId: string, completed: boolean) => {
        axios.patch(`/tasks/${taskId}`, {completed: completed})
            .then(() => {
                setTasks(tasks.map(task => {
                    if (task.id === taskId) {
                        task.completed = completed;
                    }
                    return task;
                }));
            })
            .catch(error => {
                console.log(error.error.response.data);
            })
    };

    const changeSearchTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1);
        setSearchTitle(event.target.value);
    };

    const changeNumberOfTasksPerPage = (numberOfTasksPerPage: number) => {
        setTasksPerPage(numberOfTasksPerPage)
        setPage(1);
    }

    const fetchTasks = useCallback(() => {
        const rangeStart = (page - 1) * tasksPerPage
        const rangeEnd = page * tasksPerPage
        const url = `tasks/auth/all?rangeStart=${rangeStart}&rangeEnd=${rangeEnd}&hideCompleted=${hideCompleted}&searchTitle=${searchTitle}`
        axios.get(url)
            .then(response => {
                setTasks(response.data.tasks);
                setTasksFetched(true);
                setPageCount(Math.ceil(response.data.totalCount / tasksPerPage));
            })
            .catch(error => {
                console.log(error.error.response.data);
            })
    }, [axios, page, tasksPerPage, hideCompleted, searchTitle]);

    useEffect(() => {
        fetchTasks();
        navigate(`?page=${page}&tasksPerPage=${tasksPerPage}&hideCompleted=${hideCompleted}&searchTitle=${searchTitle}`);
    }, [page, fetchTasks, navigate, tasksPerPage, hideCompleted, searchTitle]);

    return (
        <>
            <Col xs={11} sm={9} md={8} lg={7} xl={6} xxl={5}
                 className="d-flex flex-row mx-auto mb-4 shadow-sm card p-3 justify-content-between">
                <div className="d-flex flex-row">
                    <Form.Control
                        className="w-auto"
                        placeholder="Task title"
                        onChange={changeSearchTitle}
                        value={searchTitle}
                    />
                    <Form.Switch
                        type="checkbox"
                        id="hideCompleted"
                        name="hideCompleted"
                        label="Hide completed"
                        className="my-auto ms-3"
                        checked={hideCompleted}
                        onChange={() => {
                            setPage(1);
                            setHideCompleted(!hideCompleted);
                        }}
                    />
                </div>
                <Form.Select
                    className="w-auto"
                    onChange={e => changeNumberOfTasksPerPage(parseInt(e.target.value))}
                    value={tasksPerPage}>
                    {[5, 10, 15, 20].map(value => (
                        <option key={value} value={value}>
                            {value} tasks
                        </option>))}
                </Form.Select>
            </Col>
            <Col xs={11} sm={9} md={8} lg={7} xl={6} xxl={5} className="mx-auto mb-5 shadow-sm">
                <Accordion defaultActiveKey="0" alwaysOpen>
                    {getTaskListItems()}
                </Accordion>
            </Col>
            <Pagination className="mt-auto d-flex justify-content-center">
                {getPaginationItems()}
            </Pagination>
        </>
    );
}

export default TaskList;