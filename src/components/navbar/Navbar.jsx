"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Portfolio", url: "/portfolio" },
  { id: 3, title: "Blog", url: "/blog" },
  { id: 4, title: "About", url: "/about" },
  { id: 5, title: "Contact", url: "/contact" },
  { id: 6, title: "Dashboard", url: "/dashboard" },
];

const isActive = (pathname, url) => {
  if (!pathname) return false;
  if (url === "/") return pathname === "/";
  return pathname === url || pathname.startsWith(`${url}/`);
};

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo} onClick={closeMenu}>
        Daily Blog
      </Link>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className={styles.hamburger}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`${styles.bar} ${open ? styles.bar1Open : ""}`} />
        <span className={`${styles.bar} ${open ? styles.bar2Open : ""}`} />
        <span className={`${styles.bar} ${open ? styles.bar3Open : ""}`} />
      </button>

      <div className={`${styles.links} ${open ? styles.linksOpen : ""}`}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            onClick={closeMenu}
            className={`${styles.link} ${
              isActive(pathname, link.url) ? styles.linkActive : ""
            }`}
          >
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <button
            className={styles.logout}
            onClick={() => {
              closeMenu();
              signOut();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
