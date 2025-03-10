import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

interface OnboardingFunnelChartProps {
  data: any; // Bạn có thể định nghĩa kiểu dữ liệu chi tiết hơn nếu muốn
  options: ChartOptions<"bar">;
  containerStyle?: React.CSSProperties;
}

const OnboardingFunnelChart: React.FC<OnboardingFunnelChartProps> = ({
  data,
  options,
  containerStyle,
}) => {
  return (
    <div style={{ width: "100%", height: "400px", ...containerStyle }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default OnboardingFunnelChart;
