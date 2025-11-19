import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Digital Twin - AI Profile Assistant",
  description: "AI-powered professional profile assistant using RAG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
