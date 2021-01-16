import React from "react";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function WeatherChart({ data }) {
  return (
    <>
      {data && (
        <LineChart width={600} height={300} data={data}>
          <Line type="monotone" dataKey="temp_f" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
        </LineChart>
      )}
    </>
  );
}
