import React, {FC} from 'react';
import {Link} from "react-router-dom";


interface HomeProps {
}

const Home: FC<HomeProps> = () => (
    <div className="mx-auto mb-auto text-center">
        <h1 className="mb-4">Task Tracker</h1>
        <p>Welcome to the Task Tracker!</p>
        <p>
            This is a simple task manager. It allows you to create tasks, assign them to users, and track their
            progress.
        </p>
        <p>To get started, click the "Add Task" button below.</p>
        <Link to="/tasks/create" className="btn btn-theme mt-2">Add Task</Link>
    </div>
);

export default Home;
