// Các function phục vụ cho animation
//check xem element đã hiện trên dom chưa
export const checkIfInView = (elementId: string, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const rect = element.getBoundingClientRect();
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    setState(true);
  }
};

//các 1 div hiển thị 
export const animationVariants = {
  slideUp: { hidden: { y: "50%", opacity: 0 }, visible: { y: 0, opacity: 1 } },
  slideRight: { hidden: { x: "-50%", opacity: 0 }, visible: { x: 0, opacity: 1 } },
  slideLeft: { hidden: { x: "50%", opacity: 0 }, visible: { x: 0, opacity: 1 } },
};
