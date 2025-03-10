import CSKHDashBoardScreen from "@/src/screens/CSKHDashBoardScreen/CSKHDashBoardScreen";
import { HelmetProvider } from "react-helmet-async";
export default function CustomerManagement() {
  return (
    <>
      <main>
        <HelmetProvider>
          <CSKHDashBoardScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
