import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TaskForm = ({ project }) => {
    const axiosSecure = useAxiosSecure();

    const handleTask = async (e) => {
        e.preventDefault();
        const form = e.target;

        const taskData = {
            projectID: project._id,
            taskTitle: form.taskTitle.value,
            description: form.description.value,
            assignedMember: form.assignedMember.value,
            dueDate: form.dueDate.value,
            priority: form.priority.value,
            status: form.status.value,
        };

        try {
            const { data } = await axiosSecure.post("/tasks", taskData);

            if (data.success) {
                form.reset();

                document.getElementById("my_modal_1").close();

                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Task Created Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            document.getElementById("my_modal_1").close();
            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    "Something went wrong",
            });
        }
    };

    return (
        <div>
            <button
                className="btn"
                onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                }
            >
                Create Task
            </button>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-2xl mb-5">
                        Create New Task
                    </h3>

                    <form onSubmit={handleTask} className="space-y-4">
                        {/* Task Title */}
                        <input
                            type="text"
                            name="taskTitle"
                            placeholder="Task Title"
                            className="input input-bordered w-full"
                            required
                        />

                        {/* Description */}
                        <textarea
                            name="description"
                            placeholder="Description"
                            className="textarea textarea-bordered w-full"
                            required
                        />

                        {/* Assigned Member */}
                        <input
                            type="text"
                            name="assignedMember"
                            placeholder="Assigned Member"
                            className="input input-bordered w-full"
                            required
                        />

                        {/* Due Date */}
                        <input
                            type="date"
                            name="dueDate"
                            className="input input-bordered w-full"
                            required
                        />

                        {/* Priority */}
                        <select
                            name="priority"
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>

                        {/* Status */}
                        <select
                            name="status"
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>

                        {/* Buttons */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_1")
                                        .close()
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Create Task
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default TaskForm;