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
    actionType: "DELETE" | "EDIT" | "VIEW" | "CALL" | "SEND_EMAIL";
  }[];
  required?: boolean;
  isDate?: boolean;
  options?: Option[]; // Mảng option sẽ chứa các đối tượng có text và value
}

export const columns: TableColumn[] = [
  // { key: "id", label: "ID", columnType: COLUMN_TYPE.NUMBER },
  {
    key: "id",
    label: "Mã đơn hàng",
    columnType: COLUMN_TYPE.TEXT,
    required: true,
  },
  {
    key: "type",
    label: "Loại đơn hàng",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "name",
    label: "Họ tên",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "email",
    label: "Email",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "phoneNumber",
    label: "Số điện thoại",
    columnType: COLUMN_TYPE.NUMBER,
  },
  {
    key: "sales",
    label: "Sales",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "orderDate",
    label: "Ngày đặt hàng",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "paymentDate",
    label: "Ngày thanh toán",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "tranfer",
    label: "Hình thức chuyển khoản",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "saleNote",
    label: "Sales Notes",
    columnType: COLUMN_TYPE.DROPDOWN_HIGHLIGHT,
    options: [
      { text: "Đã chuyển khoản", value: "FREE" },
      { text: "Chưa chuyển khoản", value: "ULTRA" },
    ],
  },
  {
    key: "approvider",
    label: "Approvider",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "approviderDate",
    label: "Approvider Date",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "status",
    label: "Trạng thái",
    columnType: COLUMN_TYPE.DROPDOWN_HIGHLIGHT,
    options: [
      { text: "Free", value: "Đã duyệt" },
      { text: "Ultra", value: "Chưa duyệt" },
    ],
  },

  {
    key: "actions",
    label: "Hành động",
    columnType: "ACTION",
    actions: [
      { label: "Chi tiết", actionType: "VIEW" },
      { label: "Duyệt", actionType: "SEND_EMAIL" },
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
