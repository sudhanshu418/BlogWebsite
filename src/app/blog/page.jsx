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

const Blog = async () => {
  const data = await getData();

  if (!data || data.length === 0) {
    return (
      <div>
        <p style={{ color: "var(--muted)", padding: "40px 0" }}>
          No posts yet.
        </p>
      </div>
    );
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
