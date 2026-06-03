import useAuth from "../../hooks/useAuth"

const Register = () => {

    const {registerUser} = useAuth()

    const handleRegister = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        console.log(name, email, password)
        registerUser(email, password)
        .then(result => console.log(result))
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
                                    <input type="name" className="input" placeholder="Name" />
                                    <label className="label">Email</label>
                                    <input type="email" className="input" placeholder="Email" />
                                    <label className="label">Password</label>
                                    <input type="password" className="input" placeholder="Password" />
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