import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";

const TeamProductivityChart = () => {

  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["team-productivity"],
    queryFn: async () => {

      const res =
        await axiosSecure.get(
          "/analytics/team-productivity"
        );

      return res.data;
    }
  });

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Team Productivity
      </h2>

      <BarChart
        width={600}
        height={300}
        data={data}
      >
        <XAxis dataKey="_id" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="completedTasks" />

      </BarChart>

    </div>
  );
};

export default TeamProductivityChart;