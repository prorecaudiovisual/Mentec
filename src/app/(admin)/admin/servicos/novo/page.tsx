export const metadata = { title: "Novo Serviço" };

import ServiceForm from "@/components/admin/ServiceForm";

export default function NovoServicoPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-6">
        Novo Serviço
      </h1>
      <ServiceForm />
    </div>
  );
}
