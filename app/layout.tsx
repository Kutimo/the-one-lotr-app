import type { Metadata } from "next";
import "./globals.css";
import styles from "./layout.module.css"
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lotr wiki",
  description: "A fan made wiki for the lord of the rings universe",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
    <body>
    <header className={styles.header}>
    <nav className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/books">Books</Link>
    </nav>
    </header>
     {children}
    </body>
    </html>
  );
}
