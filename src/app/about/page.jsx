import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Button from "@/components/Button/Button";

export const metadata = {
  title: "About — Daily Blog",
  description:
    "Who's behind Daily Blog and what we write, design, and build.",
};

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          fill={true}
          alt=""
          className={styles.img}
        />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>Daily Blog</h1>
          <h2 className={styles.imgDesc}>
            Writing and making things on the web
          </h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Who we are</h1>
          <p className={styles.desc}>
            Daily Blog is a small, independent publication about design,
            lifestyle, and the craft of building digital products. Every post
            here comes from direct experience — things we&apos;ve tried,
            shipped, broken, and fixed — written plainly and without filler.
          </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>What we write about</h1>
          <p className={styles.desc}>
            Our work and our writing move between three areas:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Web design &amp; development</strong> — interfaces that
              are fast, accessible, and calm to use.
            </li>
            <li>
              <strong>Brand &amp; identity</strong> — visual systems that
              scale from a single logo to a full product suite.
            </li>
            <li>
              <strong>Product &amp; mobile apps</strong> — shipping polished
              experiences end-to-end, not just the marketing site.
            </li>
          </ul>
          <Button url="/contact" text="Get in touch" />
        </div>
      </div>
    </div>
  );
};

export default About;
