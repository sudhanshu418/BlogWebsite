import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>@Sudhanshu</div>
      <div className={styles.social}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <Image src="/1.png" width={15} height={15} className={styles.icon} alt="Facebook Account" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <Image src="/2.png" width={15} height={15} className={styles.icon} alt="Instagram Account" />
        </a>
        <a href="https://twitter.com/yourtwitteraccount" target="_blank" rel="noopener noreferrer">
          <Image src="/3.png" width={15} height={15} className={styles.icon} alt="Twitter Account" />
        </a>
        <a href="https://www.youtube.com/youryoutubeaccount" target="_blank" rel="noopener noreferrer">
          <Image src="/4.png" width={15} height={15} className={styles.icon} alt="Youtube Dev Account" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
