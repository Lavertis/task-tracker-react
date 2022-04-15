import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import EditTask from "./components/EditTask/EditTask";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import CreateTask from "./components/CreateTask/CreateTask";
import TaskList from "./components/TaskList/TaskList";

function App() {
    const token = localStorage.getItem("token")

    return (
        <Layout>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet"/>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>

                {token && <Route path="/tasks/create" element={<CreateTask/>}/>}
                <Route path="/tasks/create" element={<Navigate replace to="/login"/>}/>

                {token && <Route path="/tasks/user/all" element={<TaskList/>}/>}
                <Route path="/tasks/user/all" element={<Navigate replace to="/login"/>}/>

                {token && <Route path="/tasks/edit/:id" element={<EditTask/>}/>}
                <Route path="/tasks/edit/:id" element={<Navigate replace to="/login"/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
