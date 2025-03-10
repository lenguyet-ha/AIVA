import OrderListScreen from "@/src/screens/OrderListScreen/OrderListScreen";
import { HelmetProvider } from "react-helmet-async";
export default function VideoTutorial() {
  return (
    <>
      <main>
        <HelmetProvider>
          <OrderListScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
