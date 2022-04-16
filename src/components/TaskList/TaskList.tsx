import React, {FC, useEffect, useState} from 'react';
import {Task} from "../../types/Task";
import TaskListItem from "../TaskListItem/TaskListItem";
import axios from "../../api/axios";


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

    const markAsCompleted = (id: string) => {
        axios.patch(`/tasks/${id}`, {completed: true})
            .then(() => {
                setTasks(tasks.map(task => {
                    if (task._id === id) {
                        task.completed = true;
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

        fetchUserTasks()
    }, []);

    return (
        <div className="col-11 col-sm-9 col-md-8 col-lg-7 col-xl-6 col-xxl-5 mx-auto mb-auto">
            {
                tasks.map(task => (
                    <TaskListItem
                        key={task._id}
                        task={task}
                        deleteTask={deleteTask}
                        markAsCompleted={markAsCompleted}
                    />
                ))
            }
        </div>
    );
}

export default TaskList;
