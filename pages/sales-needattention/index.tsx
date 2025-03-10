import { NeedAttentionScreen } from "@/src/screens/NeedAttentionScreen";
import { HelmetProvider } from "react-helmet-async";
export default function VideoTutorial() {
  return (
    <>
      <main>
        <HelmetProvider>
          <NeedAttentionScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
