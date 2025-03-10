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
  options?: Option[]; // Mảng option sẽ chứa các đối tượng có text và value
}

export const columns: TableColumn[] = [
  // { key: "id", label: "ID", columnType: COLUMN_TYPE.NUMBER },
  {
    key: "name",
    label: "Tên khách hàng",
    columnType: COLUMN_TYPE.TEXT,
    required: true,
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
    key: "servicePackage",
    label: "Gói dịch vụ",
    columnType: COLUMN_TYPE.DROPDOWN_HIGHLIGHT,
    options: [
      { text: "Free", value: "FREE" },
      { text: "Pro", value: "PRO" },
      { text: "Enterprise", value: "ENTERPRISE" },
    ],
  },
  {
    key: "accountStatus",
    label: "Tình trạng tài khoản",
    columnType: COLUMN_TYPE.DROPDOWN_HIGHLIGHT,
    options: [
      { text: "Đang hoạt động", value: "Active" },
      { text: "Sắp hết hạn", value: "WaitingInactive" },
      { text: "Hết hạn", value: "Inactive" },
    ],
  },
  { key: "surveyTag", label: "Thẻ khảo sát", columnType: COLUMN_TYPE.TEXT },
  {
    key: "creditPercent",
    label: "Tỷ lệ sử dụng credit",
    columnType: COLUMN_TYPE.TEXT,
  },
  {
    key: "churnStatus",
    label: "Trạng thái Churn",
    columnType: COLUMN_TYPE.DROPDOWN_HIGHLIGHT,
    options: [
      { text: "Risk High", value: "HIGH" },
      { text: "Medium", value: "MEDIUM" },
      { text: "Low", value: "LOW" },
    ],
  },
  {
    key: "lastLogin",
    label: "Lần cuối đăng nhập",
    columnType: COLUMN_TYPE.TEXT_HIGHLIGHT,
  },
  {
    key: "ownerSale",
    label: "Sale phụ trách KH",
    columnType: COLUMN_TYPE.DROPDOWN,
    options: [
      { text: "Chu Văn Nam", value: "Active" },
      { text: "Chu Thị Huyền", value: "Inactive" },
      { text: "Nguyễn Quang Trung", value: "WaitingAccepted" },
    ],
  },

  {
    key: "actions",
    label: "Hành động",
    columnType: "ACTION",
    actions: [
      { label: "Xem", actionType: "VIEW" },
      { label: "Gọi ngay", actionType: "CALL" },
      { label: "Gửi Email", actionType: "SEND_EMAIL" },
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
export const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Successful Logins",
      data: [120, 150, 50, 160, 180, 190, 200],
      fill: false,
      borderColor: "#4a90e2",
      tension: 0.4,
    },
    {
      label: "Failed Logins",
      data: [10, 170, 15, 185, 18, 202, 14],
      fill: false,
      borderColor: "#ff6b6b",
      tension: 0.4,
    },
    {
      label: "Total Logins",
      data: [130, 115, 185, 78, 198, 202, 214],
      fill: false,
      borderColor: "#50e3c2",
      tension: 0.4,
    },
  ],
};

export const lineOptions = {
  responsive: true,
  maintainAspectRatio: false, // Cho phép custom chiều cao
  plugins: {
    legend: { position: "bottom" },
    title: {
      display: true,
      text: "Tần suất đăng nhập theo ngày",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
