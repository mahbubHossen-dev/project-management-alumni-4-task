
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth()
    // const navigate = useNavigate()

    if(loading){
        return <span className="loading loading-infinity loading-xl"></span>
    }

    if(user){
        return children
    }

    return (
        <Navigate to={'/login'}>
            
        </Navigate>
    );

};

export default PrivateRoute;