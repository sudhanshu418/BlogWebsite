import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

export const metadata = {
  title: "Portfolio — Daily Blog",
  description: "Selected work across illustrations, websites, and apps.",
};

const galleries = [
  {
    slug: "illustrations",
    title: "Illustrations",
    tagline: "Editorial and product illustration",
  },
  {
    slug: "websites",
    title: "Websites",
    tagline: "Marketing and portfolio builds",
  },
  {
    slug: "applications",
    title: "Applications",
    tagline: "Mobile and desktop apps",
  },
];

const Portfolio = () => {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1 className={styles.selectTitle}>Selected work</h1>
        <p className={styles.lead}>
          A small, curated slice of things I&apos;ve designed and shipped.
          Pick a gallery below.
        </p>
      </div>
      <div className={styles.items}>
        {galleries.map((g) => (
          <Link
            key={g.slug}
            href={`/portfolio/${g.slug}`}
            className={styles.item}
            aria-label={`${g.title} — ${g.tagline}`}
          >
            <span className={styles.title}>{g.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
