"use client";

import React, { useEffect } from "react";

export default function BlogError({ error, reset }) {
  useEffect(() => {
    console.error("[blog] error boundary caught:", error);
  }, [error]);

  return (
    <div
      style={{
        padding: "48px 0",
        color: "var(--muted)",
        lineHeight: 1.6,
      }}
      role="alert"
    >
      <h1 style={{ color: "var(--text)", marginBottom: 12 }}>
        Something went wrong on the blog page
      </h1>
      <p style={{ marginBottom: 16 }}>
        {error?.message || "An unexpected error occurred."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          padding: "10px 16px",
          background: "var(--accent)",
          color: "var(--on-accent)",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Try again
      </button>
    </div>
  );
}
