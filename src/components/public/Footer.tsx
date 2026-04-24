import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading font-bold text-white text-lg mb-3">
              MENTEC
            </h3>
            <p className="text-sm leading-relaxed">
              Transformadores de alta performance para a indústria brasileira.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/sobre", label: "Sobre" },
                { href: "/produtos", label: "Produtos" },
                { href: "/blog", label: "Blog" },
                { href: "/contato", label: "Contato" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>contato@mentec.com.br</li>
              <li>+55 (11) 0000-0000</li>
              <li>São Paulo — SP</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-10 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Mentec Transformadores. Todos os
          direitos reservados.
        </div>
      </div>
    </footer>
  );
}
