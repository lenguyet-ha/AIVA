export type Role =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "LEADER_SALES"
  | "SALES"
  | "AFFILIATE_MANAGER"
  | "CSKH"
  | "MARKETING"
  | "ACCOUNTANT";

export type Permission = {
  viewCustomerList: boolean | string;
  viewCustomerDetail: boolean | string;
  assignCustomer: boolean | string;
  viewCustomerReport: boolean | string;
  addOrder?: boolean | string;
  approveOrder?: boolean | string;
};

export const permissions: Record<Role, Permission> = {
  SUPER_ADMIN: {
    viewCustomerList: "Full",
    viewCustomerDetail: "Full",
    assignCustomer: "Full",
    viewCustomerReport: "Full",
  },
  ADMIN: {
    viewCustomerList: "Full",
    viewCustomerDetail: "Full",
    assignCustomer: "Full",
    viewCustomerReport: "Full",
  },
  LEADER_SALES: {
    viewCustomerList: "Xem & phân KH",
    viewCustomerDetail: "Xem tất cả",
    assignCustomer: "Được phân KH",
    viewCustomerReport: "Xem KH team",
  },
  SALES: {
    viewCustomerList: "Xem KH của mình",
    viewCustomerDetail: "Xem KH của mình",
    assignCustomer: false,
    viewCustomerReport: false,
    addOrder: true,
  },
  AFFILIATE_MANAGER: {
    viewCustomerList: false,
    viewCustomerDetail: false,
    assignCustomer: false,
    viewCustomerReport: false,
  },
  CSKH: {
    viewCustomerList: false,
    viewCustomerDetail: false,
    assignCustomer: false,
    viewCustomerReport: false,
  },
  ACCOUNTANT: {
    viewCustomerList: false,
    viewCustomerDetail: false,
    assignCustomer: false,
    viewCustomerReport: false,
    approveOrder: true,
  },
  MARKETING: {
    viewCustomerList: false,
    viewCustomerDetail: false,
    assignCustomer: false,
    viewCustomerReport: "Xem tổng hợp lead",
  },
};
export const rolePermissions: Record<Role, string[]> = {
  SUPER_ADMIN: ["/dash-board-total", "/sales", "/task-list"],
  ADMIN: ["/dash-board-total", "/sales"],
  LEADER_SALES: ["/sales"],
  SALES: ["/sales-dashboard", "/sales-needattention", "/sale-pipeline"],
  AFFILIATE_MANAGER: [],
  CSKH: [],
  MARKETING: ["/video-tutorial", "/video-tutorial-type"],
  ACCOUNTANT: [],
};
export const roleRestrictedPages: Record<Role, string[]> = {
  SUPER_ADMIN: [], // Không bị cấm menu nào
  ADMIN: [], // Không có quyền vào menu này
  LEADER_SALES: ["/task-list"], // Không có quyền vào 2 trang này
  SALES: ["/task-list"], // Bị cấm toàn bộ Sales ngoài phần nhỏ của nó
  AFFILIATE_MANAGER: [
    "/sales",
    "/customer-management",
    "/task-list",
    "/sales-dashboard",
    "/sales-needattention",
    "/sale-pipeline",
  ], // Không có quyền vào tất cả menu chính
  CSKH: [
    "/sales",
    "/sales-dashboard",
    "/sales-needattention",
    "/sale-pipeline",
  ],
  MARKETING: [
    "/sales",
    "/task-list",
    "/sales-dashboard",
    "/sales-needattention",
    "/sale-pipeline",
  ],
  ACCOUNTANT: [],
};
