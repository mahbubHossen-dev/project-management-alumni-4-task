import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ProjectProgressChart = () => {

  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["project-progress"],
    queryFn: async () => {

      const res =
        await axiosSecure.get(
          "/analytics/project-progress"
        );

      return res.data;
    }
  });

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Project Progress Trend
      </h2>

      <LineChart
        width={600}
        height={300}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="projectName" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="progress"
        />

      </LineChart>

    </div>
  );
};

export default ProjectProgressChart;