import { HaListScreen } from "@/src/screens/HaListScreen/HaListScreen";
import { HelmetProvider } from "react-helmet-async";
export default function HaList() {
  return (
    <>
      <main>
        <HelmetProvider>
          <HaListScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
