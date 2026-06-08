import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Insight = () => {
    const axiosSecure = useAxiosSecure()

    const { data: stats = {} } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/dashboard-stats');
            return data;
        }
    });

    const { data: summaries = [] } = useQuery({
        queryKey: ['project-summary'],
        queryFn: async () => {
            const { data } =
                await axiosSecure.get('/project-summary');

            return data;
        }
    });

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">

                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500">Total Projects</h3>
                    <p className="text-3xl font-bold">
                        {stats.totalProjects || 0}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500">Total Tasks</h3>
                    <p className="text-3xl font-bold">
                        {stats.totalTasks || 0}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500">Completed Tasks</h3>
                    <p className="text-3xl font-bold text-green-600">
                        {stats.completedTasks || 0}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500">Pending Tasks</h3>
                    <p className="text-3xl font-bold text-yellow-600">
                        {stats.pendingTasks || 0}
                    </p>
                </div>

                <div className="bg-white shadow rounded-xl p-6">
                    <h3 className="text-gray-500">Overdue Tasks</h3>
                    <p className="text-3xl font-bold text-red-600">
                        {stats.overdueTasks || 0}
                    </p>
                </div>

            </div>
            <div className="mt-10">

                <h2 className="text-2xl font-bold mb-5">
                    Project Summary
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {
                        summaries.map(project => (

                            <div
                                key={project._id}
                                className="bg-white p-5 rounded-xl shadow"
                            >

                                <h3 className="font-bold text-xl">
                                    {project.projectName}
                                </h3>

                                <p className="mt-2">
                                    {project.pendingTasks} Tasks Pending
                                </p>

                                <p>
                                    {project.completedPercentage}% Completed
                                </p>

                                <p>
                                    Deadline in {project.daysLeft} Days
                                </p>

                            </div>
                        ))
                    }

                </div>

            </div>
        </div>
    );
};

export default Insight;