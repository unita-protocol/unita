import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UNITA — P2P Liquid Democracy",
  description:
    "Create proposals, get AI-powered analysis, vote anonymously with zero-knowledge proofs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <header className="border-b border-neutral-800 px-6 py-4">
          <nav className="mx-auto flex max-w-4xl items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight">
              UNITA
            </a>
            <div className="flex gap-6 text-sm text-neutral-400">
              <a href="/proposals" className="hover:text-neutral-100">
                Proposals
              </a>
              <a href="/identity" className="hover:text-neutral-100">
                Identity
              </a>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
