import SalePipeLineScreen from "@/src/screens/SalePipeLineScreen/SalePipeLineScreen";
import { HelmetProvider } from "react-helmet-async";
export default function VideoTutorial() {
  return (
    <>
      <main>
        <HelmetProvider>
          <SalePipeLineScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
