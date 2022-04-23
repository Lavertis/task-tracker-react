import React, {FC, useContext, useEffect, useState} from 'react';
import {User} from "../../types/User";
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Col, Form} from "react-bootstrap";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import useAxios from "../../hooks/useAxios";
import {TokenContext} from "../../App";


interface AccountDetailsEditProps {
}

const AccountDetailsEdit: FC<AccountDetailsEditProps> = () => {
    const {setToken} = useContext(TokenContext)
    const axios = useAxios()
    const navigate = useNavigate()
    const [currentData, setCurrentData] = useState<User>({
        _id: "",
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    })
    const [newData, setNewData] = React.useState<User>({_id: "", email: "", firstName: "", lastName: "", password: ""})
    const [error, setError] = useState("")

    const handleTextChange = ({currentTarget: input}: React.ChangeEvent<HTMLInputElement>) => {
        setNewData({...newData, [input.name]: input.value})
    }

    const handleDelete = () => {
        const logout = () => {
            setToken('')
            localStorage.removeItem("jwtToken")
            navigate('/')
        };

        axios.delete(`users`)
            .then((response: AxiosResponse) => {
                console.log(response)
                logout()
            })
    }

    const handleSave = async () => {
        if (newData.email === "" && newData.firstName === "" && newData.lastName === "" && newData.password === "") {
            setError("At least one field must be filled")
            return
        }

        try {
            await axios.patch("users", newData)
            navigate(-1)
        } catch (error: any) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        axios.get(`users/auth`)
            .then((res: AxiosResponse) => {
                setCurrentData(res.data)
            })
    }, [axios])

    const [modalIsShown, setModalIsShown] = useState(false);
    const hideModal = () => setModalIsShown(false);
    const showModal = () => setModalIsShown(true);

    return (
        <Col xs={11} sm={8} md={6} lg={5} xl={4} className="mx-auto my-auto bg-light rounded-3 p-5 shadow">
            <Form>
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                    <Form.Control
                        type="email"
                        id="inputEmail"
                        name="email"
                        placeholder={currentData.email}
                        onChange={handleTextChange}
                        value={newData.email}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputFirstName">First name</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputFirstName"
                        name="firstName"
                        placeholder={currentData.firstName}
                        onChange={handleTextChange}
                        value={newData.firstName}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputLastName">Last name</Form.Label>
                    <Form.Control
                        type="text"
                        id="inputLastName"
                        name="lastName"
                        placeholder={currentData.lastName}
                        onChange={handleTextChange}
                        value={newData.lastName}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="inputPassword">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword"
                        name="password"
                        onChange={handleTextChange}
                        value={newData.password}
                    />
                </Form.Group>
                <Form.Group className="mt-5 mt-sm-4 d-grid d-sm-flex justify-content-sm-around">
                    <Button variant="danger" className="col-sm-3 mb-2 mb-sm-0" onClick={showModal}>
                        Delete
                    </Button>
                    <Button variant="success" className="col-sm-3 mb-2 mb-sm-0" onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="secondary" className="col-sm-3" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
            <DeleteConfirmationModal
                title={"Delete confirmation"}
                message={"Are you sure you want to delete your account?"}
                isShown={modalIsShown}
                confirm={handleDelete}
                hide={hideModal}
            />
        </Col>
    );
}

export default AccountDetailsEdit;
