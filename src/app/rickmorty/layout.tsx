import { ReactNode } from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rick and Morty App",
  description: "Aplicación Rick and Morty con Next.js",
};

interface LayoutProps {
  children: ReactNode;
}

export default function RickMortyLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">

      <nav className="bg-black/40 backdrop-blur-md sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 py-4">

          <Link
            href="/rickmorty"
            className="text-3xl font-bold text-green-400 hover:text-green-300 transition"
          >
            Rick and Morty App
          </Link>

        </div>

      </nav>

      {children}

    </div>
  );
}