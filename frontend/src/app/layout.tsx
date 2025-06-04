import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider } from "@/providers/MantineProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Management Admin",
  description: "Admin interface for managing job postings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
