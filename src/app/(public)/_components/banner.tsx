"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";

export const Banner = () => {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const animationFrameRef = useRef<number | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (!isMobile && theme === "dark") {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const animate = () => {
      const interpolationFactor = 0.02;
      setPrevMousePosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * interpolationFactor,
        y: prev.y + (mousePosition.y - prev.y) * interpolationFactor,
      }));

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
      cancelAnimationFrame(animationFrameRef.current!);
    };
  }, [isMobile, theme, mousePosition]);

  const blobSize = 300;
  const blobX = prevMousePosition.x - blobSize / 2;
  const blobY = prevMousePosition.y - blobSize / 2;

  const fontShadow = {
    WebkitTextStroke: "2px #fff",
    backgroundImage:
      !isMobile && theme === "dark"
        ? `radial-gradient(circle at ${blobX}px ${blobY}px, rgba(255, 255, 255, 0.8) 0%, rgba(255, 0, 0, 0.6) 50%, rgba(0, 0, 255, 0.6) 70%, rgba(0, 0, 0, 0.7) 100%)`
        : "none",
    WebkitBackgroundClip: "text",
    color: "transparent",
    backgroundColor: theme === "light" ? "black" : "transparent",
    transition: "background-image 0.1s ease",
  };

  return (
    <div className="flex flex-col items-center justify-center pt-10 text-center">
      <p className="w-full pb-4 font-bogart text-xl uppercase tracking-[.6em]">
        Keep track of your tasks and know
      </p>
      <h1
        style={fontShadow}
        className="font-bogart text-9xl font-bold uppercase text-black"
      >
        What-Todo
      </h1>
    </div>
  );
};
