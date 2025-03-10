import DealDetailCustomerScreen from "@/src/screens/DealDetailCustomerScreen/DealDetailCustomerScreen";
import { HelmetProvider } from "react-helmet-async";
export default function VideoTutorial() {
  return (
    <>
      <main>
        <HelmetProvider>
          <DealDetailCustomerScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
