import { VideoTutorialScreen } from "@/src/screens/VideoTutorialScreen/VideoTutorialScreen";
import { HelmetProvider } from "react-helmet-async";
export default function VideoTutorial() {
  return (
    <>
      <main>
        <HelmetProvider>
          <VideoTutorialScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
