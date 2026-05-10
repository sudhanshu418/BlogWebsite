"use client";

import React, { useContext } from "react";
import styles from "./darkModeToggle.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const DarkModeToggle = () => {
  const { toggle, mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      className={styles.container}
    >
      <span className={styles.icon} aria-hidden="true">🌙</span>
      <span className={styles.icon} aria-hidden="true">🔆</span>
      <span
        className={styles.ball}
        style={isDark ? { right: "2px" } : { left: "2px" }}
      />
    </button>
  );
};

export default DarkModeToggle;
