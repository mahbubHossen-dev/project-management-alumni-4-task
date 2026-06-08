import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TaskStatusChart = () => {

  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["task-status"],
    queryFn: async () => {

      const res =
        await axiosSecure.get(
          "/analytics/task-status"
        );

      return res.data;
    }
  });

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Task Status Distribution
      </h2>

      <BarChart
        width={500}
        height={300}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="status" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="count" />

      </BarChart>

    </div>
  );
};

export default TaskStatusChart;