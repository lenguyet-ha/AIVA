import CustomerDetailScreen from "@/src/screens/CustomerDetailScreen/CustomerDetailScreen";
import { HelmetProvider } from "react-helmet-async";
export default function VideoTutorial() {
  return (
    <>
      <main>
        <HelmetProvider>
          <CustomerDetailScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
