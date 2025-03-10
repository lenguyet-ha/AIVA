// Chuyển đổi thành định dạng DD/MM/YYYY
export const formattedDate = (date: any) => {
  if(typeof date !== "string") return "---";
  const isoDate = "2025-01-15T00:00:00";
  const dateObject = new Date(isoDate);
   return dateObject.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
};