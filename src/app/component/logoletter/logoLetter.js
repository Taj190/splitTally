"use client"
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Array of colors for the wave effect
const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#6B5B95", "#FFA07A"];

const SplittallyHeading = () => {
  const [colorIndex, setColorIndex] = useState(0);

  // Function to cycle through colors
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 500); // Change color every 500ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-20">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl font-bold tracking-wide"
        style={{ textShadow: "4px 4px 8px rgba(96, 16, 16, 0.3)" }}
      >
        {"SPLITTALLY".split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ color: colors[0] }}
            animate={{ color: colors[(colorIndex + index) % colors.length] }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ display: "inline-block" }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default SplittallyHeading;