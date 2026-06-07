
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const WorkloadSummery = () => {

    const axiosSecure = useAxiosSecure()

    const { data: workloadSummary = [] } = useQuery({
        queryKey: ['workload-summary'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/workload-summary');
            return data;
        }
    });

    return (
        <div>
            <div className="mb-10">

                <h2 className="text-2xl font-bold mb-4">
                    Workload Summary
                </h2>

                <div className="overflow-x-auto">

                    <table className="table table-zebra">

                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Total Tasks</th>
                                <th>Completed</th>
                                <th>Pending</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                workloadSummary.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.member}</td>
                                        <td>{item.totalTasks}</td>
                                        <td>{item.completedTasks}</td>
                                        <td>{item.pendingTasks}</td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
};

export default WorkloadSummery;