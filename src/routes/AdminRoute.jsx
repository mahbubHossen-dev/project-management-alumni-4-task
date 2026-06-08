import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../components/Forbidden';

const AdminRoute = ({children}) => {

    const {user, loading} = useAuth()
    const {role, isLoading} = useRole()
    // const navigate = useNavigate()

    if(loading, isLoading){
        return <span className="loading loading-infinity loading-xl"></span>
    }

    if(role !== 'Admin'){
        return <Forbidden />
    }

    return children;
};

export default AdminRoute;