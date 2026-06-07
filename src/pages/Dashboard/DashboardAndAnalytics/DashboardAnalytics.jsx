import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const DashboardAnalytics = () => {

    const axiosSecure= useAxiosSecure()
    
    const { data: stats = {} } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/dashboard-stats');
            return data;
        }
    });

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

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
        </div>
    );
};

export default DashboardAnalytics;