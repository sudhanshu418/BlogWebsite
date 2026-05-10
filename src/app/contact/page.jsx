import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the Daily Blog team.",
};

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{"Let's Keep in Touch"}</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.png"
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
