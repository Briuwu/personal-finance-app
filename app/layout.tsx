import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance App",
  description:
    "See all of your personal finance data at-a-glance, manage transactions, budgets, and saving pots, view recurring bills, and navigate the app with ease. Includes user authentication and database integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${publicSans.variable} bg-beige-100 w-full antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
