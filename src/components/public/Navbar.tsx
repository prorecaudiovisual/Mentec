"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/",          label: "Início" },
  { href: "/produtos",  label: "Produtos" },
  { href: "/servicos",  label: "Serviços" },
  { href: "/sobre",     label: "Sobre" },
  { href: "/blog",      label: "Blog" },
  { href: "/contato",   label: "Contato" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();
  const isHome                  = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    // Run immediately in case page loads already scrolled
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dark mode: homepage before user scrolls past hero
  const dark = isHome && !scrolled;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        dark
          ? "bg-[#111827] border-b border-white/8"
          : "bg-[#FDFAF5] border-b border-[#E3DAD0] shadow-sm"
      }`}
    >
      <div className="max-w-[1280px] mx-auto w-full px-8 h-[128px] flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="shrink-0 group">
          <Image
            src={dark ? "/MENTEC_logo_texto_branco.png" : "/MENTEC_logo.png"}
            alt="Mentec"
            width={220}
            height={96}
            className="h-32 w-auto transition-opacity duration-300 group-hover:opacity-80"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative font-heading text-[10px] uppercase tracking-[0.14em] py-1 transition-all duration-200 ${
                isActive(l.href)
                  ? "text-primary-container"
                  : dark
                  ? "text-white/65 hover:text-white"
                  : "text-[#4A4540] hover:text-[#111827]"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary-container rounded-full" />
              )}
            </Link>
          ))}
          <Link
            href="/contato"
            className="ml-2 px-5 py-2.5 font-heading text-[10px] uppercase tracking-[0.14em] bg-primary-container text-white hover:bg-[#A8501A] active:scale-95 transition-all duration-200"
          >
            Solicitar Orçamento
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden transition-colors ${dark ? "text-white" : "text-[#111827]"}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {open ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={`md:hidden border-t px-8 py-6 space-y-1 ${dark ? "bg-[#111827] border-white/8" : "bg-[#FDFAF5] border-[#E3DAD0]"}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between font-heading text-[11px] uppercase tracking-[0.14em] py-3.5 border-b transition-colors ${
                dark ? "border-white/6" : "border-[#F3EDE3]"
              } ${
                isActive(l.href)
                  ? "text-primary-container"
                  : dark
                  ? "text-white/65"
                  : "text-[#4A4540]"
              }`}
            >
              {l.label}
              <span className="material-symbols-outlined text-sm opacity-40">chevron_right</span>
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/contato"
              onClick={() => setOpen(false)}
              className="block bg-primary-container text-white font-heading text-[11px] uppercase tracking-[0.14em] px-6 py-3.5 text-center hover:bg-[#A8501A] transition-colors"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
