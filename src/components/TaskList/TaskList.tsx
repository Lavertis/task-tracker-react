import React, {FC, useEffect, useState} from 'react';
import {Task} from "../../types/Task";
import TaskListItem from "../TaskListItem/TaskListItem";
import axios from "../../api/axios";


interface TaskListProps {
}

const TaskList: FC<TaskListProps> = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchUserTasks = async () => {
            try {
                const response = await axios.get("tasks/auth/all", {
                    signal: controller.signal
                });
                isMounted && setTasks(response.data);
            } catch (err) {

            }
        }

        fetchUserTasks()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <div className="col-11 col-sm-9 col-md-8 col-lg-7 col-xl-6 col-xxl-5 mx-auto mb-auto">
            {
                tasks.map(task => (
                    <TaskListItem key={task._id} task={task}/>
                ))
            }
        </div>
    );
}

export default TaskList;
