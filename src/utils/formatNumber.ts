export const formatNumberToString = (number: number | string): string => {
  const num = typeof number === 'string' ? parseFloat(number) : number;
  if (isNaN(num)) return "0";
  
  return num.toLocaleString('en-EN');
};

export const formatNumberStringToNumber = (numberString: string | number): number => {
  if (typeof numberString === "number") return numberString;

  // Loại bỏ dấu phân cách hàng nghìn và chuyển đổi sang số
  const num = parseFloat(numberString.replace(/,/g, ""));
  
  return isNaN(num) ? 0 : num;
};

