import { COLUMN_TYPE } from "@/src/constants/tableconfigs";

type ColumnType = (typeof COLUMN_TYPE)[keyof typeof COLUMN_TYPE];

interface Option {
  text: string;
  value: string;
}

interface TableColumn {
  key: string;
  label: string;
  columnType: ColumnType; // CHẮC CHẮN kiểu này không phải string
  actions?: {
    label: string;
    actionType: "DELETE" | "EDIT" | "VIEW" | "CALL" | "SEND_EMAIL" | "CLOSED";
  }[];
  required?: boolean;
  isDate?: boolean;
  options?: Option[]; // Mảng option sẽ chứa các đối tượng có text và value
}

export const columns: TableColumn[] = [
  // { key: "id", label: "ID", columnType: COLUMN_TYPE.NUMBER },
  {
    key: "id",
    label: "Mã Ticket",
    columnType: COLUMN_TYPE.TEXT,
    required: true,
  },
  {
    key: "type",
    label: "Tiêu đề",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "name",
    label: "Khách hàng",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "priority",
    label: "Mức ưu tiên",
    columnType: COLUMN_TYPE.DROPDOWN_HIGHLIGHT,
    options: [
      { text: "Ugent", value: "Ugent" },
      { text: "High", value: "High" },
      { text: "Medium", value: "Medium" },
    ],
  },
  {
    key: "status",
    label: "Trạng thái",
    columnType: COLUMN_TYPE.DROPDOWN_HIGHLIGHT,
    options: [
      { text: "Open", value: "Active" },
      { text: "Inprogress", value: "WaitingInactive" },
    ],
  },
  {
    key: "agent",
    label: "Agent",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "orderDate",
    label: "Ngày tạo",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "paymentDate",
    label: "Ngày cập nhật",
    columnType: COLUMN_TYPE.TEXT,
  },

  {
    key: "actions",
    label: "Hành động",
    columnType: "ACTION",
    actions: [
      { label: "Xem", actionType: "VIEW" },
      { label: "Chuyển", actionType: "SEND_EMAIL" },
      { label: "Đóng", actionType: "CLOSED" },
    ],
  },
];

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
