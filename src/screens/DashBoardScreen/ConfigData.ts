export const pie_data = {
  labels: ["Content", "Chatbot", "Automation", "Khác"],
  datasets: [
    {
      data: [40, 30, 20, 10],
      backgroundColor: ["#4a90e2", "#50e3c2", "#f5a623", "#9013fe"],
      borderColor: ["#fff", "#fff", "#fff", "#fff"],
      borderWidth: 1,
    },
  ],
};

export const bar_data = {
  labels: ["0-10%", "10-30%", "30-70%", "70-100%"],
  datasets: [
    {
      label: "Credit Usage",
      data: [15, 35, 40, 10], // Giá trị mẫu
      backgroundColor: ["#4a90e2", "#50e3c2", "#f5a623", "#9013fe"],
      borderColor: "#fff",
      borderWidth: 1,
    },
  ],
};

export const pie_options = {
  plugins: {
    legend: {
      position: "right", // hoặc "bottom" nếu muốn
    },
  },
};

export const bar_options = {
  responsive: true,
  maintainAspectRatio: false, // Cho phép custom height
  plugins: {
    legend: {
      position: "right", // hoặc 'bottom'
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
