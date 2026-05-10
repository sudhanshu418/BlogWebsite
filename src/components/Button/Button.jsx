import React from "react";
import styles from "./button.module.css";
import Link from "next/link";

const Button = ({ text, url, variant = "primary" }) => {
  const className = `${styles.container} ${
    variant === "secondary" ? styles.secondary : ""
  }`.trim();

  return (
    <Link href={url} className={styles.link}>
      <button className={className}>{text}</button>
    </Link>
  );
};

export default Button;
