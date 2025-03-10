import CustomerManagementScreen from "@/src/screens/CustomerManagementScreen/CustomerManagementScreen";
import { HelmetProvider } from "react-helmet-async";
export default function CustomerManagement() {
  return (
    <>
      <main>
        <HelmetProvider>
          <CustomerManagementScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
