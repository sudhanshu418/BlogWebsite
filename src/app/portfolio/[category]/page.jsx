import React from "react";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { items } from "./data.js";
import { notFound } from "next/navigation";

const categoryLabels = {
  applications: "Applications",
  illustrations: "Illustrations",
  websites: "Websites",
};

const getData = (cat) => {
  const data = items[cat];
  if (data) return data;
  return notFound();
};

export function generateMetadata({ params }) {
  const label = categoryLabels[params.category] || "Portfolio";
  return {
    title: `${label} — Daily Blog`,
    description: `A selection of ${label.toLowerCase()} work.`,
  };
}

const Category = ({ params }) => {
  const data = getData(params.category);
  const label = categoryLabels[params.category] || params.category;

  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{label}</h1>

      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h2 className={styles.title}>{item.title}</h2>
            <p className={styles.desc}>{item.desc}</p>
            <Button text="View case study" url="/contact" />
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              fill={true}
              src={item.image}
              alt=""
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
