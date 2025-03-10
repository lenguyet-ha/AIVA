import OrderCreationScreen from "@/src/screens/OrderCreationScreen/OrderCreationScreen";
import { HelmetProvider } from "react-helmet-async";
export default function VideoTutorial() {
  return (
    <>
      <main>
        <HelmetProvider>
          <OrderCreationScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
