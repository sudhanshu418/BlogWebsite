import React from "react";
import styles from "./page.module.css";

const Loading = () => {
  return (
    <div className={styles.container} aria-busy="true" aria-live="polite">
      <h1 className={styles.title}>Loading…</h1>
    </div>
  );
};

export default Loading;
