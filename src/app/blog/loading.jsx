import React from "react";
import styles from "./page.module.css";

const SkeletonCard = () => (
  <div className={styles.container} aria-hidden="true">
    <div
      className={`skeleton ${styles.imageContainer}`}
      style={{ width: 400, height: 250 }}
    />
    <div className={styles.content}>
      <div
        className="skeleton"
        style={{ width: "70%", height: 26, marginBottom: 14 }}
      />
      <div
        className="skeleton"
        style={{ width: "95%", height: 16, marginBottom: 8 }}
      />
      <div className="skeleton" style={{ width: "80%", height: 16 }} />
    </div>
  </div>
);

const Loading = () => {
  return (
    <div aria-busy="true" aria-live="polite">
      {Array.from({ length: 3 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default Loading;
