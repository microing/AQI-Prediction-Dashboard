import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any[];
};

function AQIChart({ data }: Props) {
  return (
    <div className="card">
      <h2>AQI Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="city" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AQIChart;