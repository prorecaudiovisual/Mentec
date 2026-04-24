import type { Metadata } from "next";
import ContactForm from "@/components/public/ContactForm";

export const metadata: Metadata = { title: "Contato" };

export default function ContatoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-navy-900 mb-2">
        Entre em Contato
      </h1>
      <p className="text-gray-500 mb-8">
        Preencha o formulário e nossa equipe entrará em contato.
      </p>
      <ContactForm />
    </div>
  );
}
