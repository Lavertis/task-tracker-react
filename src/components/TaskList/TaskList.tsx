import React, {FC, useEffect, useState} from 'react';
import {Task} from "../../types/Task";
import TaskListItem from "../TaskListItem/TaskListItem";
import axios from "../../api/axios";
import {Col} from "react-bootstrap";


interface TaskListProps {
}

const TaskList: FC<TaskListProps> = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const deleteTask = (id: string) => {
        axios.delete(`/tasks/${id}`)
            .then(() => {
                setTasks(tasks.filter(task => task._id !== id));
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
                const response = await axios.get("tasks/auth/all");
                setTasks(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchUserTasks().then()
    }, []);

    return (
        <Col xs={11} sm={9} md={8} lg={7} xl={6} xxl={5} className="mx-auto mb-auto">
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
    );
}

export default TaskList;
