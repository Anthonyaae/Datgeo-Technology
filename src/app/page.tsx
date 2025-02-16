"use client"; // Si usas la App Router (Next.js 13+)

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redirige automáticamente a login
  }, [router]);

  return null; // No renderiza nada en esta página
}
