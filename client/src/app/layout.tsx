import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../contexts/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gasa admin dashboard",
  description: "NextJs admin dashboard created by gasa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " h-screen overflow-hidden"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
