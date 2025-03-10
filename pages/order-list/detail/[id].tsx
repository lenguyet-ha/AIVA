import OrderDetailScreen from "@/src/screens/OrderDetailScreen/OrderDetailScreen";
import { HelmetProvider } from "react-helmet-async";
export default function VideoTutorial() {
  return (
    <>
      <main>
        <HelmetProvider>
          <OrderDetailScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
