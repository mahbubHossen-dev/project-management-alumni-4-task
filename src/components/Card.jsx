import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useRole from "../hooks/useRole";

const Card = ({ task, refetch }) => {

    const [selectedTask, setSelectedTask] = useState(null);

    const axiosSecure = useAxiosSecure();
    const { role } = useRole()


    const handleEditTask = () => {
         if (task.status === "Completed") {

        return Swal.fire({
            icon: "warning",
            title: "Task Completed",
            text: "You can't edit or assign a new member because the task was completed.",
            confirmButtonText: "OK"
        });
    }
        setSelectedTask(task);
        document.getElementById("edit_modal_2").showModal();
    };

    const updateTask = async (e) => {

        e.preventDefault();

        const form = e.target;

        const updatedTaskData = {
            taskTitle: form.taskTitle.value,
            description: form.description.value,
            assignedMember: form.assignedMember.value,
            dueDate: form.dueDate.value,
            priority: form.priority.value,
            status: form.status.value,
        };

        try {

            const res = await axiosSecure.patch(
                `/tasks/${selectedTask._id}`,
                updatedTaskData
            );

            if (res?.data?.acknowledged) {

                refetch();

                document
                    .getElementById("edit_modal_2")
                    .close();

                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Successfully Updated!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong"
            });
        }
    };

    // Delete Task

    const handleDeleteTask = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this task!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {

            const res =
                await axiosSecure.delete(`/tasks/${id}`);

            if (res.data.deletedCount > 0) {

                Swal.fire({
                    title: "Deleted!",
                    text: "Task has been deleted.",
                    icon: "success"
                });

                refetch();
            }
        }
    };

    // Quick Status Update

    const handleStatusUpdate = async (
        id,
        status
    ) => {

        try {

            const { data } =
                await axiosSecure.patch(
                    `/tasks/status/${id}`,
                    { status }
                );

            if (data.modifiedCount > 0) {

                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Status Updated",
                    showConfirmButton: false,
                    timer: 1000
                });

                refetch();
            }

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Failed",
                text:
                    error.response?.data?.message ||
                    "Status update failed"
            });
        }
    };

    return (
        <div>

            <div className="max-w-md rounded-xl border bg-white p-5 shadow-md">

                {/* Title & Priority */}

                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-bold">
                        {task.taskTitle}
                    </h2>

                    <span
                        className={`rounded-full px-3 py-1 text-sm font-medium
                        ${task.priority === "High"
                                ? "bg-red-100 text-red-600"
                                : task.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-green-100 text-green-600"
                            }`}
                    >
                        {task.priority}
                    </span>

                </div>

                {/* Description */}

                <p className="mt-3 text-gray-600">
                    {task.description}
                </p>

                {/* Info */}

                <div className="mt-4 space-y-3 text-sm">

                    <p>
                        <span className="font-semibold">
                            Assigned Member:
                        </span>{" "}
                        {task.assignedMember}
                    </p>

                    <p>
                        <span className="font-semibold">
                            Due Date:
                        </span>{" "}
                        {task.dueDate}
                    </p>

                    {/* Quick Status Update */}

                    <div>

                        <span className="font-semibold">
                            Status:
                        </span>

                        <select
                            value={task.status}
                            onChange={(e) =>
                                handleStatusUpdate(
                                    task._id,
                                    e.target.value
                                )
                            }
                            className="select select-bordered select-sm w-full mt-2"
                        >
                            <option value="Todo">
                                Todo
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Completed">
                                Completed
                            </option>
                        </select>

                    </div>

                </div>

                {/* Progress Indicator */}

                <div className="mt-4">

                    <progress
                        className="progress progress-primary w-full"
                        value={
                            task.status === "Completed"
                                ? 100
                                : task.status ===
                                    "In Progress"
                                    ? 50
                                    : 10
                        }
                        max="100"
                    />

                </div>

                {/* Buttons */}

                {
                    (role === 'Admin' || role === 'Project Manager') && (
                        <div className="mt-5 flex gap-2">

                            <button
                                onClick={handleEditTask}
                                className="rounded bg-blue-500 px-4 py-2 text-white"
                                
                            >
                                Edit
                            </button>

                            <button
                                onClick={() =>
                                    handleDeleteTask(task._id)
                                }
                                className="rounded bg-red-500 px-4 py-2 text-white"
                            >
                                Delete
                            </button>

                        </div>
                    )
                }

            </div>

  

            <dialog
                id="edit_modal_2"
                className="modal"
            >
                <div className="modal-box max-w-2xl">

                    <h3 className="font-bold text-2xl mb-5">
                        Update Task
                    </h3>

                    <form
                        onSubmit={updateTask}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            name="taskTitle"
                            defaultValue={
                                selectedTask?.taskTitle
                            }
                            className="input input-bordered w-full"
                        />

                        <textarea
                            name="description"
                            defaultValue={
                                selectedTask?.description
                            }
                            className="textarea textarea-bordered w-full"
                        />

                        <input
                            type="text"
                            name="assignedMember"
                            defaultValue={
                                selectedTask?.assignedMember
                            }
                            className="input input-bordered w-full"
                        />

                        <input
                            type="date"
                            name="dueDate"
                            defaultValue={
                                selectedTask?.dueDate
                            }
                            className="input input-bordered w-full"
                        />

                        <select
                            name="priority"
                            defaultValue={
                                selectedTask?.priority
                            }
                            className="select select-bordered w-full"
                        >
                            <option value="High">
                                High
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Low">
                                Low
                            </option>
                        </select>

                        <select
                            name="status"
                            defaultValue={
                                selectedTask?.status
                            }
                            className="select select-bordered w-full"
                        >
                            <option value="Todo">
                                Todo
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Completed">
                                Completed
                            </option>
                        </select>

                        <div className="flex justify-end gap-2">

                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById(
                                            "edit_modal_2"
                                        )
                                        .close()
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Update Task
                            </button>

                        </div>

                    </form>

                </div>
            </dialog>

        </div>
    );
};

export default Card;