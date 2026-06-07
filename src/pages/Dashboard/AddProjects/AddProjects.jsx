import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddProjects = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const handleAddProject = async (e) => {
        e.preventDefault();

        const form = e.target;

        const projectData = {
            projectName: form.projectName.value,
            description: form.description.value,
            deadline: form.deadline.value,
            status: form.status.value,
            createdBy: user?.displayName,
            createdAt: new Date()
        };
        console.log(projectData);

        try {
            const data = await axiosSecure.post('/projects', projectData)
            if (data.data.acknowledged) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });

                form.reset();
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }

        console.log(projectData);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6">
                Create Project
            </h2>

            <form onSubmit={handleAddProject} className="space-y-4">

                {/* Project Name */}
                <div>
                    <label className="block mb-2 font-medium">
                        Project Name
                    </label>
                    <input
                        type="text"
                        name="projectName"
                        placeholder="Enter project name"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-2 font-medium">
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Project description"
                        className="textarea textarea-bordered w-full"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Deadline */}
                <div>
                    <label className="block mb-2 font-medium">
                        Deadline
                    </label>
                    <input
                        type="date"
                        name="deadline"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-2 font-medium">
                        Project Status
                    </label>
                    <select
                        name="status"
                        className="select select-bordered w-full"
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Create Project
                </button>

            </form>
        </div>
    );
};

export default AddProjects;