import React, {useEffect, useState} from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TaskListItem from "./TaskListItem";


const UserTasks = () => {
    const [tasks, setTasks] = useState([{
        _id: 0,
        title: '',
        description: '',
        completed: '',
        createdAt: '',
        updatedAt: ''
    }]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchUserTasks = async () => {
            try {
                const response = await axiosPrivate.get("tasks/user", {
                    signal: controller.signal
                });
                isMounted && setTasks(response.data);

            } catch (err) {
                console.error(err);
            }
        }

        fetchUserTasks()

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate]);

    return (
        <div className="mt-5 col-11 col-sm-9 col-md-8 col-lg-7 col-xl-6 col-xxl-5 mx-auto">
            {
                tasks.map(task => (
                    <TaskListItem key={task._id} task={task}/>
                ))
            }
        </div>
    );
}

UserTasks.propTypes = {};

UserTasks.defaultProps = {};

export default UserTasks;
