import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TaskForm from "../../components/TaskForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllProjects = () => {

    const axiosSecure = useAxiosSecure();

    const [status, setStatus] = useState('');
    const [deadlineStatus, setDeadlineStatus] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const { data: projects = [] } = useQuery({
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

    return (
        <div className="max-w-7xl mx-auto py-10">

            {/* Filters */}

            <div className="flex flex-wrap gap-4 mb-10">

                <input
                    type="text"
                    placeholder="Search Project"
                    className="input input-bordered"
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    className="select select-bordered"
                    onChange={(e) =>
                        setStatus(e.target.value)
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
                        setSort(e.target.value)
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

            {/* Projects */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

                {
                    projects.map(project => (

                        <div
                            key={project._id}
                            className="card bg-base-100 shadow-sm"
                        >

                            <div className="card-body">

                                <h2 className="card-title">

                                    {project.projectName}

                                    <div className="badge badge-secondary">
                                        {project.status}
                                    </div>

                                </h2>

                                <p>
                                    {project.description}
                                </p>

                                <div className="card-actions justify-end">

                                    <div className="badge badge-outline">
                                        Deadline:
                                        {" "}
                                        {project.deadline}
                                    </div>

                                </div>

                                <TaskForm
                                    project={project}
                                />

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default AllProjects;