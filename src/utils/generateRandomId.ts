export const generateRandomId = (): string => {
  const randomId = Math.random().toString(36).substr(2, 9); // Tạo ID ngẫu nhiên
  return `new-${randomId}`;
};
