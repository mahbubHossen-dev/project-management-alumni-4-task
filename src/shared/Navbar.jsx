import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';


const Navbar = () => {
    const { user, logoutUser } = useAuth()
    // const role = useRole()


    const handleLogout = () => {
        logoutUser()
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    
                    <a className="btn btn-ghost text-xl">Alumni 4</a>
                </div>
                
                <div className="navbar-end space-x-1">

                    {
                        user ? <>
                            <button onClick={handleLogout} className="btn">Logout</button>
                        </> : <>
                            <Link to={'/login'} className="btn">Sign In</Link>
                            <Link to={'/register'} className="btn">Sign Up</Link>
                        </>
                    }


                </div>

            </div>
        </div>
    );
};

export default Navbar;