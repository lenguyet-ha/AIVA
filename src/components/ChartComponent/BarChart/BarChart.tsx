import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface BarChartProps {
  data: any; // Bạn có thể định nghĩa kiểu dữ liệu chi tiết hơn
  options?: ChartOptions<"bar">; // options tùy chọn, kiểu ChartOptions cho Bar Chart
  containerStyle?: React.CSSProperties; // Style cho div bọc ngoài
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  options,
  containerStyle,
}) => {
  return (
    <div style={{ width: "100%", height: "100%", ...containerStyle }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
