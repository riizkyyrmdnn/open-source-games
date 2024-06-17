import { useState, useEffect } from "react";

function useRandomBg() {
  const [color, setColor] = useState("");

  useEffect(() => {
    const generateRandomHSL = () => {
      const hue1 = Math.floor(Math.random() * 360);
      const hue2 = (hue1 + Math.floor(Math.random() * 180) + 180) % 360; // Ensure a different color
      const saturation1 = Math.floor(Math.random() * 100) + 1;
      const saturation2 = Math.floor(Math.random() * 100) + 1;
      const lightness1 = Math.floor(Math.random() * 100) + 1;
      const lightness2 = Math.floor(Math.random() * 100) + 1;
      const rotate = Math.floor(Math.random() * 360);

      return `linear-gradient(${rotate}deg, hsl(${hue1}, ${saturation1}%, ${lightness1}%), hsl(${hue2}, ${saturation2}%, ${lightness2}%))`;
    };

    const newColor = generateRandomHSL();
    setColor(newColor);
    document.body.style.background = newColor;
  }, []);

  return color;
}

export default useRandomBg;
