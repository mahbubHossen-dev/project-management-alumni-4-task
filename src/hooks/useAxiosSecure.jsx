import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://alumni-4-task-server.onrender.com'
})

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;