import React from 'react';
import useAuth from '../../hooks/useAuth';

const Login = () => {

    const {loginUser} = useAuth()

    const handleLogin = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        console.log(name, email, password)
        loginUser(email, password)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className=" bg-base-200 min-h-screen">
                    <div className="mx-auto flex-col lg:flex-row-reverse pt-16 ">
                        
                        
                        <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <h1 className='text-center text-2xl font-bold'>Login</h1>
                                {/* <button>Login Credentials</button> */}
                                <fieldset className="fieldset">
                                    <label className="label">Email</label>
                                    <input name='email' type="email" className="input" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input name='password' type="password" className="input" placeholder="Password" />
                                    <div><a className="link link-hover">Forgot password?</a></div>
                                    <button className="btn btn-neutral mt-4">Login</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;