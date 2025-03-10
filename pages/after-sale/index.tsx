import AfterSaleCustomerScreen from "@/src/screens/AfterSaleCustomerScreen/AfterSaleCustomerScreen";
import { HelmetProvider } from "react-helmet-async";
export default function CustomerManagement() {
  return (
    <>
      <main>
        <HelmetProvider>
          <AfterSaleCustomerScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
