
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth()
    console.log(user)

    if(!user){
        return <Navigate to={'/login'}></Navigate>
    }

    if(loading){
        return <span className="loading loading-infinity loading-xl"></span>
    }

    return children
};

export default PrivateRoute;