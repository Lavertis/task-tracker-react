import React from 'react';
import {Link} from "react-router-dom";

// homepage for task tracker
const Home = () => (
    <div className="mx-auto mt-5 text-center">
        <h1 className="mb-4">Task Tracker</h1>
        <p>Welcome to the Task Tracker!</p>
        <p>
            This is advanced task tracker that not only allows you to create, edit, and delete tasks,
            but also assign them to other users.
        </p>
        <p>To get started, click the "Add Task" button below.</p>
        <Link to="/tasks/create" className="btn btn-primary mt-2">Add Task</Link>
    </div>
);

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
