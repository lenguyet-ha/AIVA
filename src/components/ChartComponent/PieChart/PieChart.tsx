import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: any; // Bạn có thể định nghĩa kiểu cụ thể hơn nếu muốn
  options?: ChartOptions<"pie">; // options là tùy chọn, kiểu ChartOptions cho biểu đồ Pie
  containerStyle?: React.CSSProperties; // tùy chọn style cho div bọc ngoài
}

const PieChart: React.FC<PieChartProps> = ({
  data,
  options,
  containerStyle,
}) => {
  return (
    <div style={{ width: "100%", height: "100%", ...containerStyle }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
