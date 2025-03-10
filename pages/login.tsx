import { LoginScreen } from "@/src/screens/LoginScreen";
import { HelmetProvider } from "react-helmet-async";

export default function Login() {
  return (
    <>
      <main>
        <HelmetProvider>
          <LoginScreen />
        </HelmetProvider>
      </main>
    </>
  );
}
