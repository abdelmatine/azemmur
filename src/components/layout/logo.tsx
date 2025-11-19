"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo({ size = 10 }: { size?: number }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && theme === "dark" ? "/images/logo2.jpg" : "/images/logo1.jpg";

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-background shadow-md overflow-hidden`}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      {mounted ? (
        <Image src={logoSrc} alt="Azemmur Logo" fill className="object-cover" />
      ) : (
        <div className="w-full h-full bg-muted"></div>
      )}
    </div>
  );
}
