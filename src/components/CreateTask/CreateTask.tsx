import React, {FC, useEffect, useState} from 'react';
import axios from '../../api/axios';
import {useNavigate} from "react-router-dom";
import {User} from "../../types/User";

interface CreateTaskProps {
}

const CreateTask: FC<CreateTaskProps> = () => {
    const token = localStorage.getItem("token");
    const currentUserEmail = token ? JSON.parse(atob(token.split('.')[1])).email : null;

    const [assignableUserEmails, setAssignableUserEmails] = useState<string[]>([])

    const [searchText, setSearchText] = useState('')
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [assignedTo, setAssignedTo] = useState<Set<string>>(new Set())

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            title,
            description,
            dueDate,
            assignedTo: Array.from(assignedTo)
        }

        try {
            console.log(data)
            const res = await axios.post("tasks", data)
            console.log(res)
            navigate("/tasks/user/all")
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    const handleUserSearch = async () => {
        if (searchText.length === 0) {
            setAssignableUserEmails([])
            return
        }

        try {
            const url = `users/search/${searchText}`
            const res = await axios.get(url)
            const emails = res.data.map((user: User) => user.email).filter((email: string) => !assignedTo.has(email))
            setAssignableUserEmails(emails)
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    const removeEmailFromAssignedUserEmails = (e: React.MouseEvent, email: string) => {
        e.preventDefault()

        const newAssigned = new Set(new Set(Array.from(assignedTo.values()).filter((u: string) => u !== email)))
        setAssignedTo(newAssigned)
    }

    const addEmailToAssignedUserEmails = (e: React.MouseEvent, email: string) => {
        e.preventDefault()

        const newAssignedUserEmails = new Set([...Array.from(assignedTo.values()), email])
        setAssignedTo(newAssignedUserEmails)

        const newAssignableUserEmails = assignableUserEmails.filter((u: string) => u !== email)
        setAssignableUserEmails(newAssignableUserEmails)
    }

    useEffect(() => {
        const currentUser: Array<string> = [currentUserEmail]
        setAssignedTo(new Set(currentUser))
    }, [])

    useEffect(() => {
        handleUserSearch()
    }, [assignedTo])

    useEffect(() => {
        handleUserSearch()
    }, [searchText])

    return (
        <div
            className="col-11 col-sm-8 col-md-6 col-lg-5 col-xl-4 mx-auto my-auto bg-light rounded-3 p-5 shadow">
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" required placeholder="Title"
                           onChange={(e) => setTitle(e.target.value)} value={title}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea rows={3} name="description" className="form-control" required placeholder="Description"
                              onChange={(e) => setDescription(e.target.value)} value={description}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Due Date</label>
                    <input type="datetime-local" name="dueDate" className="form-control" required
                           onChange={(e) => setDueDate(e.target.value)} value={dueDate}/>
                </div>
                <fieldset className="border p-3 mb-3">
                    <legend className="float-none w-auto ps-2 fw-light m-0">Assign to</legend>
                    <div className="mb-3">
                        {
                            Array.from(assignedTo.values()).map((email: string) => {
                                return (
                                    <div key={email} className="d-flex justify-content-between mb-1">
                                        <span
                                            className="my-auto">{email === currentUserEmail ? `${email} (You)` : email}</span>
                                        <button className="btn btn-sm btn-danger"
                                                onClick={(e) => removeEmailFromAssignedUserEmails(e, email)}>
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" value={searchText}
                               onChange={(e) => setSearchText(e.target.value)}
                               placeholder="User's email address"/>
                    </div>
                    <div className="">
                        {
                            assignableUserEmails.map((email: string) => {
                                return (
                                    <div key={email} className="d-flex justify-content-between mb-1">
                                        <span
                                            className="my-auto">{email === currentUserEmail ? `${email} (You)` : email}</span>
                                        <button className="btn btn-sm btn-success"
                                                onClick={(e) => addEmailToAssignedUserEmails(e, email)}>
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </fieldset>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Create Task</button>
                </div>
            </form>
        </div>
    );
}

export default CreateTask;
