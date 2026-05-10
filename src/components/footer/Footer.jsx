import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const socialLinks = [
  { href: "https://www.facebook.com", src: "/1.png", label: "Facebook" },
  { href: "https://www.instagram.com", src: "/2.png", label: "Instagram" },
  { href: "https://twitter.com", src: "/3.png", label: "Twitter" },
  { href: "https://www.youtube.com", src: "/4.png", label: "YouTube" },
];

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>© {new Date().getFullYear()} Sudhanshu</div>
      <div className={styles.social}>
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
          >
            <Image
              src={s.src}
              width={16}
              height={16}
              className={styles.icon}
              alt=""
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Footer;
