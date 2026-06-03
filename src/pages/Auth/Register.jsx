
// import useAuth from "../../hooks/useAuth"

import { useNavigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import axios from "axios"
import useAxiosSecure from "../../hooks/useAxiosSecure"

const Register = () => {

    const { registerUser, updateUserProfile, setUser } = useAuth()
    const navigate = useNavigate()

    const axiosSecure = useAxiosSecure()

    const handleRegister = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        registerUser(email, password)
            .then(async result => {
                if (result?.user) {
                    await updateUserProfile(name)
                        .then(result => {
                            setUser(result?.user)
                        })
                    const userData = {
                        name: result.user?.displayName,
                        email: result.user?.email,
                        role: 'member'
                    }

                    await axiosSecure.post('/user', userData)
                        .then(res => console.log(res))
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <form onSubmit={handleRegister}>
            <div className=" bg-base-200 min-h-screen">
                <div className="mx-auto flex-col lg:flex-row-reverse pt-16 ">
                    <div className="card mx-auto bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className='text-center text-2xl font-bold'>Register</h1>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input name="name" type="name" className="input" placeholder="Name" />
                                <label className="label">Email</label>
                                <input name="email" type="email" className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input name="password" type="password" className="input" placeholder="Password" />
                                <button className="btn btn-neutral mt-4">Register</button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Register;