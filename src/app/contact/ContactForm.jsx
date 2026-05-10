"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({ type: null, text: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill in all fields." });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: null, text: "" });

    await new Promise((r) => setTimeout(r, 400));

    setSubmitting(false);
    setStatus({
      type: "success",
      text: "Thanks! Your message has been recorded.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        placeholder="Name"
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />
      <input
        type="email"
        placeholder="Email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <textarea
        className={styles.textArea}
        placeholder="Message"
        rows={8}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {status.type && (
        <div
          className={`${styles.status} ${
            status.type === "success"
              ? styles.statusSuccess
              : styles.statusError
          }`}
          role="status"
        >
          {status.text}
        </div>
      )}
      <button type="submit" className={styles.submit} disabled={submitting}>
        {submitting ? "Sending…" : "Send"}
      </button>
    </form>
  );
};

export default ContactForm;
