import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import connect from "@/utils/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

async function getData() {
  await connect();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(posts));
}

const EmptyState = ({ children }) => (
  <div
    style={{
      padding: "48px 0",
      color: "var(--muted)",
      fontSize: 16,
      lineHeight: 1.6,
    }}
  >
    {children}
  </div>
);

const Blog = async () => {
  let data = [];
  let loadError = null;

  try {
    data = await getData();
  } catch (err) {
    console.error("[blog] failed to load posts:", err);
    loadError = err?.message || "Unknown error";
  }

  if (loadError) {
    return (
      <EmptyState>
        <p style={{ marginBottom: 8, color: "var(--text)", fontWeight: 600 }}>
          We couldn&apos;t load posts right now.
        </p>
        <p>
          The database isn&apos;t responding. If you&apos;re the site owner,
          check that the <code>MONGO</code> environment variable is set on
          your host and that the connection string is reachable.
        </p>
      </EmptyState>
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState>No posts yet — check back soon.</EmptyState>;
  }

  return (
    <div>
      {data.map((item) => (
        <Link
          href={`/blog/${item._id}`}
          className={styles.container}
          key={item._id}
        >
          <div className={styles.imageContainer}>
            {item.img ? (
              <Image
                src={item.img}
                alt=""
                width={400}
                height={250}
                className={styles.image}
              />
            ) : null}
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
