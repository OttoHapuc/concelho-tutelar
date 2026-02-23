import { Heart, Users, Scale, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: Heart,
    title: "Protecao da Vida",
    description:
      "Cada denuncia pode interromper um ciclo de violencia e proteger uma crianca de danos fisicos e psicologicos irreversiveis.",
  },
  {
    icon: Users,
    title: "Responsabilidade Social",
    description:
      "A protecao de criancas e adolescentes e dever da familia, da sociedade e do Estado. Voce faz parte dessa rede de protecao.",
  },
  {
    icon: Scale,
    title: "Garantia de Direitos",
    description:
      "O Estatuto da Crianca e do Adolescente (ECA) garante direitos fundamentais. Denunciar e fazer valer esses direitos.",
  },
  {
    icon: ShieldCheck,
    title: "Sigilo Garantido",
    description:
      "Sua identidade pode ser mantida em sigilo. O importante e que a denuncia chegue ate nos para que possamos agir.",
  },
];

export function ImportanceSection() {
  return (
    <section id="importancia" className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Por que denunciar e tao importante?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Entenda como sua atitude pode transformar a vida de uma crianca ou
            adolescente em situacao de vulnerabilidade.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <Card
              key={reason.title}
              className="border-border bg-card transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <reason.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
