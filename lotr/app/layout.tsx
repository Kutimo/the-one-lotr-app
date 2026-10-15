import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lotr wiki",
  description: "A fan made wiki for the lord of the rings universe",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
