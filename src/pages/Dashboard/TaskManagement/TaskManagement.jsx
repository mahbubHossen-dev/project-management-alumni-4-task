import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Card from '../../../components/Card';

const TaskManagement = () => {

    const axiosSecure = useAxiosSecure();

    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');
    const [assignedMember, setAssignedMember] = useState('');
    const [search, setSearch] = useState('');
    const [deadlineStatus, setDeadlineStatus] = useState('');
    const [sort, setSort] = useState('');

    const [debouncedSearch, setDebouncedSearch] =
        useState('');

    const [debouncedMember, setDebouncedMember] =
        useState('');

    // Search Debounce

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedSearch(search);

        }, 1000);

        return () => clearTimeout(timer);

    }, [search]);

    // Assigned Member Debounce

    useEffect(() => {

        const timer = setTimeout(() => {

            setDebouncedMember(
                assignedMember
            );

        }, 1000);

        return () => clearTimeout(timer);

    }, [assignedMember]);

    const {
        data: tasks = [],
        isLoading,
        refetch
    } = useQuery({

        queryKey: [
            'tasks',
            status,
            priority,
            debouncedMember,
            debouncedSearch,
            deadlineStatus,
            sort
        ],

        queryFn: async () => {

            const { data } =
                await axiosSecure.get('/tasks', {

                    params: {
                        status,
                        priority,
                        assignedMember:
                            debouncedMember,
                        search:
                            debouncedSearch,
                        deadlineStatus,
                        sort
                    }
                });

            return data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-10">

            <h2 className="text-3xl font-bold mb-8">
                Task Management
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-8">

                <input
                    type="text"
                    placeholder="Search Task"
                    className="input input-bordered"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                <input
                    type="text"
                    placeholder="Search Member"
                    className="input input-bordered"
                    value={assignedMember}
                    onChange={(e) =>
                        setAssignedMember(
                            e.target.value
                        )
                    }
                />

                <select
                    className="select select-bordered"
                    value={status}
                    onChange={(e) =>
                        setStatus(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        All Status
                    </option>

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

                <select
                    className="select select-bordered"
                    value={priority}
                    onChange={(e) =>
                        setPriority(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        All Priority
                    </option>

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
                    className="select select-bordered"
                    value={deadlineStatus}
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
                    value={sort}
                    onChange={(e) =>
                        setSort(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Sort By
                    </option>

                    <option value="latest">
                        Latest Created
                    </option>

                    <option value="deadline">
                        Nearest Deadline
                    </option>

                    <option value="updated">
                        Recently Updated
                    </option>

                    <option value="priority">
                        Highest Priority
                    </option>

                </select>

            </div>

            <h3 className="mb-5 font-semibold">
                Total Tasks:
                {tasks.length}
            </h3>

            {
                tasks.length === 0 ? (

                    <div className="text-center py-20">
                        No Tasks Found
                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {
                            tasks.map(task => (

                                <Card
                                    key={task._id}
                                    task={task}
                                    refetch={refetch}
                                />

                            ))
                        }

                    </div>

                )
            }

        </div>
    );
};

export default TaskManagement;