import React, {Dispatch, SetStateAction, useEffect} from 'react';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.js';
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Auth/Register";
import EditTask from "./components/Task/EditTask";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import AddTask from "./components/Task/AddTask";
import TaskList from "./components/Task/TaskList/TaskList";
import AccountDetails from "./components/Account/AccountDetails";
import AccountDetailsEdit from "./components/Account/AccountDetailsEdit";
import Error404NotFound from "./components/Errors/Error404NotFound";
import {isTokenExpired} from "./helpers/token-helper";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

export const TokenContext = React.createContext<{ token: string; setToken: Dispatch<SetStateAction<string>>; }>(
    {
        token: '',
        setToken: () => {
        }
    }
);

function App() {
    const [token, setToken] = React.useState<string>(localStorage.getItem('jwtToken') ?? '');

    useEffect(() => {
        document.title = "Task Tracker"

        if (token && isTokenExpired(token)) {
            localStorage.removeItem('jwtToken');
            setToken('');
        }
    }, [token]);

    return (
        <TokenContext.Provider value={{token, setToken}}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login redirectTo='/'/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route path="/tasks/create" element={<AddTask/>}/>
                        <Route path="/tasks/*" element={<TaskList/>}/>
                        <Route path="/tasks/:taskId/edit" element={<EditTask/>}/>
                        <Route path="/account" element={<AccountDetails/>}/>
                        <Route path="/account/edit" element={<AccountDetailsEdit/>}/>
                    </Route>

                    <Route path="*" element={<Error404NotFound/>}/>
                </Routes>
            </Layout>
        </TokenContext.Provider>
    );
}

export default App;