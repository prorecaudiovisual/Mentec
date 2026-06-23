import type { Metadata } from "next";
import { Figtree, Archivo } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
});

const archivo = Archivo({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: {
    default: "Mentec Transformadores",
    template: "%s | Mentec",
  },
  description:
    "Transformadores de alta performance para a indústria brasileira.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body
        className={`${figtree.variable} ${archivo.variable} font-sans bg-surface text-on-surface`}
      >
        {children}
      </body>
    </html>
  );
}
