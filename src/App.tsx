import React, {useEffect} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import EditTask from "./components/EditTask/EditTask";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import AddTask from "./components/AddTask/AddTask";
import TaskList from "./components/TaskList/TaskList";
import AccountDetails from "./components/AccountDetails/AccountDetails";
import AccountDetailsEdit from "./components/AccountDetailsEdit/AccountDetailsEdit";

function App() {
    const token = localStorage.getItem("token")

    useEffect(() => {
        document.title = "Task Tracker"
    }, []);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>

                {token && <Route path="/tasks/create" element={<AddTask/>}/>}
                <Route path="/tasks/create" element={<Navigate replace to="/login"/>}/>

                {token && <Route path="/tasks/user/all" element={<TaskList/>}/>}
                <Route path="/tasks/user/all" element={<Navigate replace to="/login"/>}/>

                {token && <Route path="/tasks/edit/:id" element={<EditTask/>}/>}
                <Route path="/tasks/edit/:id" element={<Navigate replace to="/login"/>}/>

                {token && <Route path="/account" element={<AccountDetails/>}/>}
                <Route path="/account" element={<Navigate replace to="/login"/>}/>

                {token && <Route path="/account/edit" element={<AccountDetailsEdit/>}/>}
                <Route path="/account/edit" element={<Navigate replace to="/login"/>}/>
            </Routes>
        </Layout>
    );
}

export default App;