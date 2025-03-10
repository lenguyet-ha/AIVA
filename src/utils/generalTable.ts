// Hàm tạo ngày ngẫu nhiên với khoảng cách từ 4 đến 7 ngày
export const generateRandomDateRange = (): {
  startDate: string;
  endDate: string;
} => {
  // Tạo ngày ngẫu nhiên cho startDate
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 10)); // Thêm từ 0 đến 9 ngày vào ngày hiện tại

  // Tạo số ngày ngẫu nhiên từ 4 đến 7 ngày
  const randomDays = Math.floor(Math.random() * 4) + 4; // Số ngày từ 4 đến 7

  // Tính ngày endDate dựa trên startDate và số ngày ngẫu nhiên
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + randomDays); // Cộng thêm số ngày ngẫu nhiên vào startDate

  // Chuyển ngày thành định dạng 'yyyy-mm-dd'
  const startDateFormatted = startDate.toISOString().split("T")[0];
  const endDateFormatted = endDate.toISOString().split("T")[0];

  return { startDate: startDateFormatted, endDate: endDateFormatted };
};

export const countDots = (version: string): number => {
  const dots = version.match(/\./g); // Tìm tất cả dấu '.'
  return dots ? dots.length : 0; // Trả về số lượng dấu '.' nếu có, ngược lại trả về 0
};