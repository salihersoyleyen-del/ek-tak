import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ekipman Takip",
  description: "Ekipman Takip Sistemi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}
