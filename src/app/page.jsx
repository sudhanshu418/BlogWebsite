import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/hero.png";
import Button from "@/components/Button/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src={Hero} alt="" className={styles.img} priority />
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Design, writing, and work from the web
        </h1>
        <p className={styles.desc}>
          Daily Blog is a small publication about design craft, lifestyle,
          and the products we ship — written by the people who make them.
        </p>
        <div className={styles.actions}>
          <Button url="/blog" text="Read the blog" />
          <Button url="/portfolio" text="See the work" variant="secondary" />
        </div>
      </div>
    </div>
  );
}
