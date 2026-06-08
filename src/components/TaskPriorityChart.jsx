import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TaskPriorityChart = () => {

  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["task-priority"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/analytics/task-priority"
      );
      return res.data;
    }
  });

  const COLORS = [
    "#ef4444",
    "#f59e0b",
    "#22c55e"
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Tasks by Priority
      </h2>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
          label
        >
          {
            data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))
          }
        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>

    </div>
  );
};

export default TaskPriorityChart;