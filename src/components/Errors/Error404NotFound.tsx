import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Alert, Col} from "react-bootstrap";


interface Error404NotFoundProps {
}

const Error404NotFound: FC<Error404NotFoundProps> = () => {
    const navigate = useNavigate()
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer as NodeJS.Timeout);
    }, [counter]);

    useEffect(() => {
        counter === 0 && navigate('/')
    }, [counter, navigate])

    return (
        <Col xs={11} sm={10} md={8} lg={7} xl={6} className="text-center mt-5 mx-auto mb-auto">
            <Alert variant="danger">
                <p className="h4 mt-2 mb-4">Error 404</p>
                <p className="fs-5">Oopsss, we did not find the page you are looking for</p>
                <p>You will be redirected to the home page in {counter} seconds</p>
            </Alert>
        </Col>
    );
}

export default Error404NotFound;
