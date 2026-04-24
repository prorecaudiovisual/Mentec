import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a história e os valores da Mentec Transformadores.",
};

export default function SobrePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-navy-900 mb-6">
        Sobre a Mentec
      </h1>

      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          A <strong>Mentec Transformadores</strong> é uma empresa brasileira especializada na
          fabricação e comercialização de transformadores elétricos de alta performance,
          atendendo indústrias, distribuidoras de energia e o setor comercial em todo o Brasil.
        </p>

        <h2 className="font-heading text-xl font-bold text-navy-900 mt-8 mb-3">
          Nossa Missão
        </h2>
        <p className="text-gray-600">
          Fornecer transformadores elétricos de excelência, garantindo segurança, eficiência
          e durabilidade para os nossos clientes, contribuindo para o desenvolvimento da
          infraestrutura elétrica nacional.
        </p>

        <h2 className="font-heading text-xl font-bold text-navy-900 mt-8 mb-3">
          Nossos Valores
        </h2>
        <ul className="space-y-2 text-gray-600 list-disc pl-5">
          <li>Qualidade em todos os processos de fabricação</li>
          <li>Compromisso com a segurança dos nossos produtos</li>
          <li>Respeito ao meio ambiente com linha ecológica</li>
          <li>Inovação tecnológica contínua</li>
          <li>Atendimento próximo e responsivo ao cliente</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-navy-900 mt-8 mb-3">
          Linha de Produtos
        </h2>
        <p className="text-gray-600">
          Fabricamos transformadores monofásicos, trifásicos, especiais e ecológicos,
          com ampla gama de potências e tensões, adaptados às necessidades específicas
          de cada aplicação industrial e comercial.
        </p>
      </div>
    </div>
  );
}
