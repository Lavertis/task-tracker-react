import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Layout from "./components/Layout/Layout";
import CreateTask from "./components/CreateTask/CreateTask";
import UserTasks from "./components/TaskList/UserTasks";
import EditTask from "./components/EditTask/EditTask";

function App() {
    const user = localStorage.getItem("token")

    return (
        <Layout>
            <Routes>
                {user && <Route path="/" element={<Home/>}/>}
                <Route path="/" element={<Navigate replace to="/login"/>}/>

                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>

                {user && <Route path="/tasks/create" element={<CreateTask/>}/>}
                <Route path="/tasks/create" element={<Navigate replace to="/login"/>}/>

                {user && <Route path="/tasks/user" element={<UserTasks/>}/>}
                <Route path="/tasks/user" element={<Navigate replace to="/login"/>}/>

                {user && <Route path="/tasks/edit/:id" element={<EditTask/>}/>}
                <Route path="/tasks/edit/:id" element={<Navigate replace to="/login"/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
