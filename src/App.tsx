import React, {Dispatch, SetStateAction, useEffect} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Route, Routes, useLocation} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import EditTask from "./components/EditTask/EditTask";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import AddTask from "./components/AddTask/AddTask";
import TaskList from "./components/TaskList/TaskList";
import AccountDetails from "./components/AccountDetails/AccountDetails";
import AccountDetailsEdit from "./components/AccountDetailsEdit/AccountDetailsEdit";
import Error404 from "./components/Error404/Error404";
import {isTokenExpired} from "./helpers/token-helper";

export const TokenContext = React.createContext<{ token: string; setToken: Dispatch<SetStateAction<string>>; }>(
    {
        token: '',
        setToken: () => {
        }
    }
);

function App() {
    const [token, setToken] = React.useState<string>(localStorage.getItem('token') ?? '');
    const location = useLocation();

    useEffect(() => {
        document.title = "Task Tracker"

        const checkToken = () => {
            if (!token) return;
            if (isTokenExpired(token)) {
                localStorage.removeItem('token');
                setToken('');
            }
        };
        checkToken();
    }, [token]);

    return (
        <TokenContext.Provider value={{token, setToken}}>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login redirectTo='/'/>}/>

                    {token && <Route path="/tasks/create" element={<AddTask/>}/>}
                    <Route path="/tasks/create" element={<Login redirectTo={location.pathname}/>}/>

                    {token && <Route path="/tasks/user/all/*" element={<TaskList/>}/>}
                    <Route path="/tasks/user/all/*" element={<Login redirectTo={location.pathname}/>}/>

                    {token && <Route path="/tasks/edit/:id" element={<EditTask/>}/>}
                    <Route path="/tasks/edit/:id" element={<Login redirectTo={location.pathname}/>}/>

                    {token && <Route path="/account" element={<AccountDetails/>}/>}
                    <Route path="/account" element={<Login redirectTo={location.pathname}/>}/>

                    {token && <Route path="/account/edit" element={<AccountDetailsEdit/>}/>}
                    <Route path="/account/edit" element={<Login redirectTo={location.pathname}/>}/>

                    <Route path="*" element={<Error404/>}/>
                </Routes>
            </Layout>
        </TokenContext.Provider>
    );
}

export default App;