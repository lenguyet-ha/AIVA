import { CustomerScreen } from "@/src/screens/CustomerScreen/CustomerScreen";
import { HelmetProvider } from "react-helmet-async";
export default function Customer() {
  return (
    <>
      <main>
        <HelmetProvider>
          <CustomerScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
