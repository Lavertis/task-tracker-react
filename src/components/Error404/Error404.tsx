import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";


interface Error404Props {
}

const Error404: FC<Error404Props> = () => {
    const [counter, setCounter] = useState(5);
    const navigate = useNavigate()

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer as NodeJS.Timeout);
    }, [counter]);

    useEffect(() => {
        counter === 0 && navigate('/')
    }, [counter])

    return (
        <div className="container-fluid mb-auto">
            <div className="alert alert-danger text-center col-11 col-sm-10 col-md-8 col-lg-7 col-xl-6 mx-auto">
                <p className="h3 mt-2 mb-4">
                    Error 404
                </p>
                <p className="fs-5">Oopsss, we did not find the page you are looking for</p>
                <p className="fs-5">{counter}</p>
            </div>
        </div>
    );
}

export default Error404;
