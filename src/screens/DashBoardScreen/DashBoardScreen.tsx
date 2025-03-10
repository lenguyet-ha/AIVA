import React, { useEffect, useState } from "react";
import { useStyles } from "./DashBoardScreen.styles";
import PieChart from "@/src/components/ChartComponent/PieChart/PieChart";
import BarChart from "@/src/components/ChartComponent/BarChart/BarChart";
import { bar_data, bar_options, pie_data, pie_options } from "./ConfigData";
import OnboardingFunnelChart from "@/src/components/ChartComponent/OnboardingFunnelChart/OnboardingFunnelChart";
import { ChartOptions } from "chart.js";
import { Box } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { TableHead } from "@mui/material";
import { lang } from "@/src/constants/lang";

const DashBoardScreen = React.memo(() => {
  const classes = useStyles();
  const labels = [
    "Đăng ký",
    "Điền survey",
    "Tạo Agent",
    "Dùng 10 credit",
    "Nâng cấp",
  ];

  const generateRandomData = () =>
    labels.map(() => Math.floor(Math.random() * 1000));

  const [funnelData, setFunnelData] = useState<number[]>(generateRandomData());

  // Mô phỏng cập nhật dữ liệu động mỗi 3 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setFunnelData(generateRandomData());
    }, 3000);
    return () => clearInterval(interval);
  }, [labels]);

  const data = {
    labels,
    datasets: [
      {
        label: "Số lượng người dùng",
        data: funnelData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom", // Có thể đổi thành 'bottom' nếu muốn
      },
      title: {
        display: true,
        text: "Onboarding Funnel",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const stats = [
    { title: "Free Users", value: "12,345", desc: "+5% so với tháng trước" },
    { title: "Paid Users", value: "4,560", desc: "Gói Basic/Pro/VIP" },
    { title: "Free→Paid (30d)", value: "8%", desc: "Tỷ lệ nâng cấp gói" },
    {
      title: "Avg. Credit Usage",
      value: "65%",
      desc: "Người dùng free / tháng",
    },
    { title: "Churn Rate (30d)", value: "9%", desc: "Free + Paid" },
    { title: "Cạn Credit (10%)", value: "340", desc: "Cơ hội upsell" },
  ];

  const copyRefLink = () => {
    const copyText = document.querySelector<HTMLInputElement>(
      ".referral-link input",
    );
    if (copyText) {
      copyText.select();
      copyText.setSelectionRange(0, 99999); // Để hỗ trợ mobile
      document.execCommand("copy");
      alert("Link đã được copy: " + copyText.value);
    }
  };
  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.pageTitle}>
          {lang.surveyCustomer.view.header}
        </Box>
        <Box className={classes.pageDesc}>
          {lang.surveyCustomer.view.subheader}
        </Box>

        <Box className={classes.statsRow}>
          {stats.map((stat, index) => (
            <Box key={index} className={classes.card}>
              <Typography variant="h6">{stat.title}</Typography>
              <Box className={classes.bigValue}>{stat.value}</Box>
              <Box className={classes.desc}>{stat.desc}</Box>
            </Box>
          ))}
        </Box>

        <Box className={classes.statsRow}>
          <Box className={classes.chartCard}>
            <h3> {lang.surveyCustomer.view.AIPurpose}</h3>
            <Box className={classes.chartPlaceholder}>
              <Box>
                <PieChart data={pie_data} options={pie_options} />
              </Box>
            </Box>
          </Box>
          <Box className={classes.chartCard}>
            <h3> {lang.surveyCustomer.view.creditUsageDistribution}</h3>
            <Box className={classes.chartPlaceholder}>
              <BarChart data={bar_data} options={bar_options} />
            </Box>
          </Box>
        </Box>

        <Box className={classes.statsRow}>
          <Box className={classes.wideCard}>
            <Typography variant="h6">
              {lang.surveyCustomer.view.needAttention}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> {lang.surveyCustomer.view.customer}</TableCell>
                  <TableCell> {lang.surveyCustomer.view.email}</TableCell>
                  <TableCell> {lang.surveyCustomer.view.dayIdle}</TableCell>
                  <TableCell> {lang.surveyCustomer.view.creditUser}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Nguyễn Văn A</TableCell>
                  <TableCell>nguyenvana@example.com</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>90%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Trần Thị B</TableCell>
                  <TableCell>tranthib@example.com</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>5%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>

        <Box className={classes.statsRow}>
          <Box className={classes.wideCard}>
            <Typography variant="h6">
              {lang.surveyCustomer.view.topCommission}
            </Typography>
            <Table className={classes.miniTable}>
              <TableHead>
                <TableRow>
                  <TableCell> {lang.surveyCustomer.view.ctv}</TableCell>
                  <TableCell>
                    {" "}
                    {lang.surveyCustomer.view.numberRefferrals}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {lang.surveyCustomer.view.revenueGenerated}
                  </TableCell>
                  <TableCell> {lang.surveyCustomer.view.commission} </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Lê Hoàng</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>₫12,000,000</TableCell>
                  <TableCell>₫600,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phạm Anh</TableCell>
                  <TableCell>9</TableCell>
                  <TableCell>₫9,000,000</TableCell>
                  <TableCell>₫450,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>

        <Box className={classes.statsRow}>
          <Box className={classes.chartCard}>
            <h3> {lang.surveyCustomer.view.onboardingFunnel}</h3>
            <Box className={classes.onBoardingChart}>
              <OnboardingFunnelChart data={data} options={options} />
              <Box> {lang.surveyCustomer.view.numberByStep}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
export { DashBoardScreen };
