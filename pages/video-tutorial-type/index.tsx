import { VideoTutorialTypeScreen } from "@/src/screens/VideoTutorialTypeScreen/VideoTutorialTypeScreen";
import { HelmetProvider } from "react-helmet-async";
export default function VideoTutorial() {
  return (
    <>
      <main>
        <HelmetProvider>
          <VideoTutorialTypeScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
