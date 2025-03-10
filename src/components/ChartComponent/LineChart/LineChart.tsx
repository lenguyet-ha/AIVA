// ChartLine.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
);

interface ChartLineProps {
  data?: any;
  options?: any;
  width?: number | string;
  height?: number | string;
}

const ChartLine: React.FC<ChartLineProps> = ({
  data,
  options,
  width = "100%",
  height = 300,
}) => {
  return (
    <div style={{ width, height }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartLine;
