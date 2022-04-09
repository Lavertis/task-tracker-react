import {axiosPrivate} from "../axios";
import {useEffect} from "react";

const useAxiosPrivate = () => {
    const authToken = localStorage.getItem('token');

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${authToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }
    }, [authToken]);

    return axiosPrivate;
}

export default useAxiosPrivate;