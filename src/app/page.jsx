import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/hero.png";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src={Hero} alt="" className={styles.img} />
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>
          EXPLORE BLOGS.
        </h1>
        <p className={styles.desc}>
          Enriching lives through insightful lifestyle blogs.
        </p>
        <Button url="/portfolio" text="See Our Works"/>
      </div>
    </div>
  );
}
