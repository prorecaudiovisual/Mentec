import Link from "next/link";

const navLinks = [
  { href: "/sobre",   label: "Sobre" },
  { href: "/produtos", label: "Produtos" },
  { href: "/blog",    label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] w-full mt-auto">
      {/* Top accent */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-primary-container to-transparent" />

      {/* Main content */}
      <div className="max-w-[1280px] mx-auto w-full px-8 pt-16 pb-12 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">

        {/* Brand */}
        <div>
          <p className="font-display text-[36px] font-bold text-white tracking-[0.18em] uppercase leading-none mb-1">
            MENTEC
          </p>
          <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-primary-container mb-6">
            TRANSFORMADORES
          </p>
          <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-[260px]">
            Excelência técnica em transformadores elétricos para os setores
            mais exigentes da indústria brasileira. Desde 1995.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-primary-container mb-6">
            Navegação
          </p>
          <ul className="space-y-3.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-heading text-[11px] uppercase tracking-[0.12em] text-[#6B7280] hover:text-white transition-colors duration-150 flex items-center gap-2 group"
                >
                  <span className="w-3 h-px bg-primary-container/40 group-hover:w-4 group-hover:bg-primary-container transition-all duration-200" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-primary-container mb-6">
            Contato
          </p>
          <div className="space-y-4">
            <div>
              <p className="font-heading text-[9px] uppercase tracking-[0.15em] text-[#4B5563] mb-1">E-mail</p>
              <p className="text-sm text-[#9CA3AF]">contato@mentec.com.br</p>
            </div>
            <div>
              <p className="font-heading text-[9px] uppercase tracking-[0.15em] text-[#4B5563] mb-1">Telefone</p>
              <p className="text-sm text-[#9CA3AF]">+55 (11) 0000-0000</p>
            </div>
            <div>
              <p className="font-heading text-[9px] uppercase tracking-[0.15em] text-[#4B5563] mb-1">Endereço</p>
              <p className="text-sm text-[#9CA3AF]">Av. Industrial, 4500<br />São Paulo, SP — Brasil</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 max-w-[1280px] mx-auto px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="font-heading text-[9px] uppercase tracking-[0.15em] text-[#374151]">
          © {new Date().getFullYear()} Mentec Transformadores. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-2">
          <span className="w-4 h-px bg-primary-container/50" />
          <p className="font-heading text-[9px] uppercase tracking-[0.15em] text-[#374151]">
            Fundada em 1995 · São Paulo, Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
