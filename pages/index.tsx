// pages/index.tsx
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import { LandingPage } from "@/src/components/LandingPage";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/survey-customer"); // Chuyển hướng sang trang /login
    } else {
      router.push("/login");
    }
  }, []);
  return null;
};

export default Page;
