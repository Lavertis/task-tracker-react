import React, {Dispatch, SetStateAction, useEffect} from 'react';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.js';
import {Route, Routes, useLocation} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Auth/Register";
import EditTask from "./components/Task/EditTask";
import Login from "./components/Auth/Login";
import Home from "./components/Home";
import AddTask from "./components/Task/AddTask";
import TaskList from "./components/Task/TaskList/TaskList";
import AccountDetails from "./components/Account/AccountDetails";
import AccountDetailsEdit from "./components/Account/AccountDetailsEdit";
import Error404 from "./components/Errors/Error404";
import {isTokenExpired} from "./helpers/token-helper";

export const TokenContext = React.createContext<{ token: string; setToken: Dispatch<SetStateAction<string>>; }>(
    {
        token: '',
        setToken: () => {
        }
    }
);

function App() {
    const [token, setToken] = React.useState<string>(localStorage.getItem('jwtToken') ?? '');
    const location = useLocation();

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