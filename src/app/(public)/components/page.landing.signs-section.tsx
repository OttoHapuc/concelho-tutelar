import {
  AlertTriangle,
  Eye,
  MessageCircleWarning,
  HelpCircle,
} from "lucide-react";

const signs = [
  {
    icon: AlertTriangle,
    title: "Sinais Fisicos",
    items: [
      "Hematomas, queimaduras ou ferimentos frequentes",
      "Marcas de objetos no corpo",
      "Desnutricao ou falta de higiene",
      "Roupas inadequadas para o clima",
    ],
  },
  {
    icon: Eye,
    title: "Sinais Comportamentais",
    items: [
      "Medo excessivo de adultos ou de ir para casa",
      "Isolamento social e tristeza constante",
      "Agressividade ou apatia extrema",
      "Regressao de comportamento",
    ],
  },
  {
    icon: MessageCircleWarning,
    title: "Sinais de Negligencia",
    items: [
      "Faltas frequentes na escola",
      "Crianca sozinha por longos periodos",
      "Falta de acompanhamento medico",
      "Desnutricao ou fome aparente",
    ],
  },
  {
    icon: HelpCircle,
    title: "O que fazer?",
    items: [
      "Nao confronte o suposto agressor",
      "Anote informacoes que possam ajudar",
      "Procure o Conselho Tutelar ou ligue 100",
      "Sua denuncia pode ser anonima",
    ],
  },
];

export function SignsSection() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Como identificar sinais de violencia?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Conhecer os sinais e o primeiro passo para proteger. Fique atento
            aos indicios de que uma crianca ou adolescente pode estar em
            situacao de risco.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {signs.map((sign) => (
            <div
              key={sign.title}
              className="rounded-xl border border-border bg-background p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <sign.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {sign.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {sign.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
