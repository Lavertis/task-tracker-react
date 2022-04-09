import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Layout from "./components/Layout/Layout";

function App() {
    const user = localStorage.getItem("token")

    return (
        <Layout>
            <Routes>
                {user && <Route path="/" element={<Home/>}/>}
                <Route path="/" element={<Navigate replace to="/login"/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
