import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
import React from "react";
import { NextPage } from "next";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: NextPage<RootLayoutProps> = ({ children }): React.JSX.Element => {
  return (
    <html lang="en">
      <body className={cn("antialiased", fontHeading.variable, fontBody.variable)}>{children}</body>
    </html>
  );
};

export default RootLayout;
