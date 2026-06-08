import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';

const Login = () => {

    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fillCredential = (role) => {
        if (role === 'admin') {
            setEmail('admin@gmail.com');
            setPassword('123456');
        }

        if (role === 'manager') {
            setEmail('projectmanager@gmail.com');
            setPassword('123456');
        }

        if (role === 'member') {
            setEmail('member@gmail.com');
            setPassword('123456');
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        loginUser(email, password)
            .then(result => {
                if (result.user) {
                    navigate('/dashboard');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div className="bg-base-200 min-h-screen">
                    <div className="mx-auto flex-col lg:flex-row-reverse pt-16">

                        <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">

                                <h1 className='text-center text-2xl font-bold'>
                                    Login
                                </h1>

                                <div className="flex gap-2 mb-4">

                                    <button
                                        type="button"
                                        onClick={() => fillCredential('admin')}
                                        className="btn btn-sm btn-primary"
                                    >
                                        Admin Login
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => fillCredential('manager')}
                                        className="btn btn-sm btn-secondary"
                                    >
                                        Manager Login
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => fillCredential('member')}
                                        className="btn btn-sm btn-accent"
                                    >
                                        Member Login
                                    </button>

                                </div>

                                <fieldset className="fieldset">

                                    <label className="label">Email</label>

                                    <input
                                        type="email"
                                        className="input"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />

                                    <label className="label">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        className="input"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />

                                    <div>
                                        <a className="link link-hover">
                                            Forgot password?
                                        </a>
                                    </div>

                                    <button className="btn btn-neutral mt-4">
                                        Login
                                    </button>

                                </fieldset>
                            </div>

                            <Link
                                className='text-center mx-auto pb-4'
                                to='/register'
                            >
                                Don't have an account? Register
                            </Link>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;