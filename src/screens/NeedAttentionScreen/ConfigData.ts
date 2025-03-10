export const pie_data = {
  labels: ["New", "Contact", "Negotiation", "Closed Won", "Lost"],
  datasets: [
    {
      data: [50, 30, 25, 20, 15], // Số lượng cơ hội bán hàng theo từng giai đoạn
      backgroundColor: ["#4a90e2", "#50e3c2", "#f5a623", "#7ed321", "#d0021b"],
      borderColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
      borderWidth: 1,
    },
  ],
};

export const bar_data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Actual Revenue",
      data: [80, 120, 150, 200, 250, 300, 280, 320, 350, 370, 400, 420], // Doanh thu thực tế
      backgroundColor: "#4a90e2",
      borderColor: "#fff",
      borderWidth: 1,
    },
    {
      label: "Target Revenue",
      data: [100, 130, 160, 220, 270, 310, 290, 330, 360, 390, 410, 430], // Doanh thu mục tiêu
      backgroundColor: "#f5a623",
      borderColor: "#fff",
      borderWidth: 1,
    },
  ],
};

export const pie_options = {
  plugins: {
    legend: {
      position: "right",
    },
    tooltip: {
      enabled: true,
    },
  },
};

export const bar_options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Revenue (in thousand $)",
      },
    },
    x: {
      title: {
        display: true,
        text: "Months",
      },
    },
  },
};
