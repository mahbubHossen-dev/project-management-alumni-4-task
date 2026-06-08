import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import TaskForm from "../../components/TaskForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProjects = () => {

    const axiosSecure = useAxiosSecure();

    const [status, setStatus] = useState('');
    const [deadlineStatus, setDeadlineStatus] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const [selectedProject, setSelectedProject] =
        useState(null);

    const { data: projects = [], refetch } =
        useQuery({
            queryKey: [
                'projects',
                status,
                deadlineStatus,
                search,
                sort
            ],

            queryFn: async () => {

                const { data } =
                    await axiosSecure.get('/projects', {
                        params: {
                            status,
                            deadlineStatus,
                            search,
                            sort
                        }
                    });

                return data;
            }
        });

    // DELETE PROJECT

    const handleDeleteProject = async (id) => {

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This project will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete"
        });

        if (!result.isConfirmed) return;

        try {

            const { data } =
                await axiosSecure.delete(
                    `/projects/${id}`
                );

            if (data.deletedCount > 0) {

                Swal.fire({
                    icon: "success",
                    title: "Project Deleted",
                    timer: 1500,
                    showConfirmButton: false
                });

                refetch();
            }

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong"
            });
        }
    };

    // OPEN UPDATE MODAL

    const handleUpdateProject = (project) => {

        setSelectedProject(project);

        document
            .getElementById(
                "update_project_modal"
            )
            .showModal();
    };

    // UPDATE PROJECT

    const handleProjectUpdate = async (e) => {

        e.preventDefault();

        const form = e.target;

        const updatedProject = {

            projectName:
                form.projectName.value,

            description:
                form.description.value,

            deadline:
                form.deadline.value,

            status:
                form.status.value
        };

        try {

            const { data } =
                await axiosSecure.patch(
                    `/projects/${selectedProject._id}`,
                    updatedProject
                );

            if (
                data.modifiedCount > 0
            ) {

                document
                    .getElementById(
                        "update_project_modal"
                    )
                    .close();

                Swal.fire({
                    icon: "success",
                    title:
                        "Project Updated Successfully",
                    timer: 1500,
                    showConfirmButton: false
                });

                refetch();
            }

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong"
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-10">

            {/* FILTERS */}

            <div className="flex flex-wrap gap-4 mb-10">

                <input
                    type="text"
                    placeholder="Search Project"
                    className="input input-bordered"
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                <select
                    className="select select-bordered"
                    onChange={(e) =>
                        setStatus(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        All Status
                    </option>

                    <option value="Active">
                        Active
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                    <option value="On Hold">
                        On Hold
                    </option>
                </select>

                <select
                    className="select select-bordered"
                    onChange={(e) =>
                        setDeadlineStatus(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        All Deadlines
                    </option>

                    <option value="Upcoming">
                        Upcoming
                    </option>

                    <option value="Overdue">
                        Overdue
                    </option>
                </select>

                <select
                    className="select select-bordered"
                    onChange={(e) =>
                        setSort(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Sort By
                    </option>

                    <option value="deadline">
                        Nearest Deadline
                    </option>
                </select>

            </div>

            {/* PROJECTS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

                {
                    projects.map(project => (

                        <div
                            key={project._id}
                            className="card bg-base-100 shadow-sm"
                        >

                            <div className="card-body">

                                <h2 className="card-title flex justify-between">

                                    <p>
                                        {
                                            project.projectName
                                        }
                                    </p>

                                    <div className="badge badge-secondary">
                                        {
                                            project.status
                                        }
                                    </div>

                                </h2>

                                <p>
                                    {
                                        project.description
                                    }
                                </p>

                                <div className="card-actions justify-end pt-4">

                                    <div className="badge badge-outline">

                                        Deadline:
                                        {" "}
                                        {
                                            project.deadline
                                        }

                                    </div>

                                </div>

                                <TaskForm
                                    project={project}
                                    refetch={refetch}
                                />

                                <div className="flex gap-2 mt-4">

                                    <button
                                        onClick={() =>
                                            handleUpdateProject(
                                                project
                                            )
                                        }
                                        className="btn btn-info text-white"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDeleteProject(
                                                project._id
                                            )
                                        }
                                        className="btn btn-error text-white"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        </div>
                    ))
                }

            </div>

            {/* UPDATE MODAL */}

            <dialog
                id="update_project_modal"
                className="modal"
            >
                <div className="modal-box max-w-2xl">

                    <h3 className="font-bold text-2xl mb-5">
                        Update Project
                    </h3>

                    <form
                        onSubmit={
                            handleProjectUpdate
                        }
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            name="projectName"
                            defaultValue={
                                selectedProject?.projectName
                            }
                            className="input input-bordered w-full"
                            required
                        />

                        <textarea
                            name="description"
                            defaultValue={
                                selectedProject?.description
                            }
                            className="textarea textarea-bordered w-full"
                            required
                        />

                        <input
                            type="date"
                            name="deadline"
                            defaultValue={
                                selectedProject?.deadline
                            }
                            className="input input-bordered w-full"
                            required
                        />

                        <select
                            name="status"
                            defaultValue={
                                selectedProject?.status
                            }
                            className="select select-bordered w-full"
                        >
                            <option value="Active">
                                Active
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="On Hold">
                                On Hold
                            </option>
                        </select>

                        <div className="flex justify-end gap-2">

                            <button
                                type="button"
                                className="btn"
                                onClick={() =>
                                    document
                                        .getElementById(
                                            "update_project_modal"
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
                                Update Project
                            </button>

                        </div>

                    </form>

                </div>
            </dialog>

        </div>
    );
};

export default AllProjects;