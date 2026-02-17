"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/authService";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const session = await getSession();
        if (session) {
          router.replace("/dashboard");
        } else {
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Error checking session:", error);
        router.replace("/auth/login");
      }
    })();
  }, [router]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Checking authentication...</p>
      </div>
    </div>
  );
}
