export const APLICACOES = [
  { icon: "electric_bolt", label: "Eletrificação Rural" },
  { icon: "lightbulb",     label: "Iluminação Pública" },
  { icon: "construction",  label: "Construção Civil" },
  { icon: "home",          label: "Residências" },
  { icon: "factory",       label: "Uso Industrial" },
  { icon: "storefront",    label: "Comércio e Serviços" },
] as const;

export type Aplicacao = typeof APLICACOES[number]["label"];
