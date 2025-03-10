import { SalesDashBoardScreen } from "@/src/screens/SalesDashBoardScreen";
import { HelmetProvider } from "react-helmet-async";
export default function VideoTutorial() {
  return (
    <>
      <main>
        <HelmetProvider>
          <SalesDashBoardScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
