export const convertStatusToVietnamese = (status: string) => {
  const statusMap: Record<string, string> = {
    WaitingAccepted: "Chờ xác nhận",
    Active: "Đang hoạt động",
    Inactive: "Không hoạt động",
  };

  return statusMap[status] || status; // Nếu không tìm thấy, trả về nguyên trạng thái gốc
};

export const convertSystem = (status: string) => {
  const statusMap: Record<string, string> = {
    Yes: "Admin",
    No: "App",
  };

  return statusMap[status] || status; // Nếu không tìm thấy, trả về nguyên trạng thái gốc
};

export const truncateText = (text: string, maxLength = 150) => {
  return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};
export const formatNumberWithCommasWithoutTrunc = (number: number): string => {
  return Math.trunc(number)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
export const formatDate = (isoString: string): string => {
  if (!isoString) return ""; // Xử lý trường hợp undefined hoặc null

  return isoString?.split("T")[0]; // Lấy phần yyyy-MM-dd trước "T"
};
export const daysUntilExpiry = (expiryDateStr: string): number => {
  const expiryDate = new Date(expiryDateStr);
  const currentDate = new Date();
  const diffTime = expiryDate.getTime() - currentDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
