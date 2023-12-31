import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn Next 13",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="px-4 m-auto max-w-screen-lg grid min-h-screen grid-rows-[60px,1fr,60px] gap-4 ">
          <nav className="flex items-center text-2xl">Aplicacion Libros</nav>
          <section>{children}</section>
          <footer className="flex items-center justify-center">
            Creado por Berna
          </footer>
        </main>
      </body>
    </html>
  );
}
