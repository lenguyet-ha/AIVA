import { DashBoardScreen } from "@/src/screens/DashBoardScreen/DashBoardScreen";
import { HelmetProvider } from "react-helmet-async";
export default function DashBoard() {
  return (
    <>
      <main>
        <HelmetProvider>
          <DashBoardScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
