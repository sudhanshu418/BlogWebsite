import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import connect from "@/utils/db";
import Post from "@/models/Post";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

async function getData(id) {
  if (!mongoose.isValidObjectId(id)) return notFound();
  await connect();
  const post = await Post.findById(id).lean();
  if (!post) return notFound();
  return JSON.parse(JSON.stringify(post));
}

export async function generateMetadata({ params }) {
  try {
    const post = await getData(params.id);
    return {
      title: post.title,
      description: post.desc,
    };
  } catch {
    return { title: "Post — Daily Blog" };
  }
}

const BlogPost = async ({ params }) => {
  let data;
  try {
    data = await getData(params.id);
  } catch (err) {
    console.error("[blog/[id]] failed to load post:", err);
    return (
      <div
        style={{
          padding: "48px 0",
          color: "var(--muted)",
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ color: "var(--text)", marginBottom: 12 }}>
          Couldn&apos;t load this post
        </h1>
        <p>
          The database isn&apos;t responding. Please try again in a moment.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>{data.desc}</p>
          <div className={styles.author}>
            {data.img ? (
              <Image
                src={data.img}
                alt=""
                width={40}
                height={40}
                className={styles.avatar}
              />
            ) : null}
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {data.img ? (
            <Image
              src={data.img}
              alt=""
              fill={true}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : null}
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{data.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
