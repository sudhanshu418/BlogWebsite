"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const initialForm = { title: "", desc: "", img: "", content: "" };

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();

  const username = session?.data?.user?.name;
  const { data, mutate, error, isLoading } = useSWR(
    username ? `/api/posts?username=${encodeURIComponent(username)}` : null,
    fetcher
  );

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  if (session.status === "loading") {
    return <p className={styles.loadingState}>Loading…</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
    return null;
  }

  const onChange = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const { title, desc, img, content } = form;
    if (!title.trim() || !desc.trim() || !content.trim()) {
      setFormError("Title, description, and content are required.");
      return;
    }
    if (img && !/^https?:\/\//i.test(img)) {
      setFormError("Image must be a valid URL starting with http(s)://");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, username }),
      });
      if (!res.ok) throw new Error("Failed to create post");
      mutate();
      setForm(initialForm);
    } catch (err) {
      setFormError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      mutate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        <h1>Your posts</h1>
        {isLoading && (
          <div aria-busy="true" aria-live="polite">
            {Array.from({ length: 2 }).map((_, i) => (
              <div className={styles.post} key={i}>
                <div
                  className={`skeleton ${styles.imgContainer}`}
                  aria-hidden="true"
                />
                <div
                  className="skeleton"
                  style={{ flex: 1, height: 22 }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        )}
        {error && <div className={styles.loadingState}>Failed to load posts.</div>}
        {!isLoading && !error && (!data || data.length === 0) && (
          <div className={styles.emptyState}>No posts yet — create your first one on the right.</div>
        )}
        {data?.map((post) => (
          <div className={styles.post} key={post._id}>
            <div className={styles.imgContainer}>
              {post.img ? (
                <Image src={post.img} alt="" fill className={styles.img} sizes="200px" />
              ) : null}
            </div>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <button
              type="button"
              className={styles.delete}
              onClick={() => handleDelete(post._id)}
              aria-label={`Delete ${post.title}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <form className={styles.new} onSubmit={handleSubmit}>
        <h1>Add New Post</h1>
        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          value={form.title}
          onChange={onChange("title")}
        />
        <input
          type="text"
          placeholder="Description"
          className={styles.input}
          value={form.desc}
          onChange={onChange("desc")}
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          className={styles.input}
          value={form.img}
          onChange={onChange("img")}
        />
        <textarea
          placeholder="Content"
          className={styles.textArea}
          rows={10}
          value={form.content}
          onChange={onChange("content")}
        />
        {formError && (
          <div className={styles.loadingState} role="alert">{formError}</div>
        )}
        <button type="submit" className={styles.button} disabled={submitting}>
          {submitting ? "Publishing…" : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
