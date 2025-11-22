
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomDot = (props) => {
  const { cx, cy, index, data } = props;

  if (index === data.length - 1) {
    // Last point = solid orange
    return (
      <circle cx={cx} cy={cy} r={8} fill="#F97316" stroke="#F97316" strokeWidth={3} />
    );
  }

  // All other points = white center + blue border
  return (
    <circle cx={cx} cy={cy} r={6} fill="white" stroke="#0ea5e9" strokeWidth={3} />
  );
};

export default function Graph({ data }) {
  return (
    <div className="w-full h-64 bg-white rounded-xl shadow mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}   
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          
          <XAxis
            dataKey="date"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"  
          />
          
          <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
          
          <Tooltip
            cursor={{ stroke: "#0ea5e9", strokeWidth: 2 }}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
          
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={<CustomDot data={data} />}
            activeDot={{ r: 10, stroke: "#0ea5e9", strokeWidth: 3, fill: "white" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}