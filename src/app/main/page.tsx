"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Main.module.css"; // Asegúrate de que la ruta sea correcta

export default function Main() {
  const [heatmapStyle, setHeatmapStyle] = useState({});
  const [color, setColor] = useState("#00563b");

  const colors = ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#8b00ff"]; // Colores del arcoíris
  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prevColor) => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 500); 

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setHeatmapStyle({
      background: `radial-gradient(circle at ${clientX}px ${clientY}px, ${color}, transparent 3%)`,
    });
  };

  const handleMouseLeave = () => {
    setHeatmapStyle({
      background: 'none',
    });
  };

  useEffect(() => {
    const navbar = document.querySelector(`.${styles.navbar}`);
    navbar.addEventListener("mousemove", handleMouseMove);
    navbar.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      navbar.removeEventListener("mousemove", handleMouseMove);
      navbar.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [color]);

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.heatmap} style={heatmapStyle}></div>
        <div className={styles.navItems}>
        <Link href="/Users">
                Users
            </Link>
            <Link href="/Data">
                Data
            </Link>
            <Link href="/Profile">
                Profile
            </Link>
        </div>
      </nav>
      <main className={styles.mainContent}>
      <span className={styles.rainbow}>RAINBOW</span> <span className={styles.data}>DATA</span>
      </main>
    </div>
  );
}