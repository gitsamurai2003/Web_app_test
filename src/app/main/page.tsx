"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./Main.module.css"; // Asegúrate de que la ruta sea correcta

export default function Main() {
  const { data: session, status } = useSession();
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
    if (navbar) {
      navbar.addEventListener("mousemove", handleMouseMove);
      navbar.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (navbar) {
        navbar.removeEventListener("mousemove", handleMouseMove);
        navbar.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [color]);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log("Cerrar sesión");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.heatmap} style={heatmapStyle}></div>
        <div>
          <span className={styles.rainbow}>RAINBOW</span> <span className={styles.data}>DATA</span>
        </div>
        <div className={styles.navItems}>
          <Link href="/users">
            Users
          </Link>
          <Link href="/data">
            Data
          </Link>
          <Link href="/profile">
           Profile
          </Link>
        </div>
      </nav>
      <main className={styles.mainContent}>
        <h1>Welcome to the Main Page</h1>
        <p>This is the main page you see after a successful login.</p>
        <p>User ID: {session?.user?.id}</p>
      </main>
      <button className={styles.logoutButton} onClick={handleLogout}>X</button>
    </div>
  );
}