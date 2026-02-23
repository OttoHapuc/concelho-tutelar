import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 sm:px-12 lg:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
              Nao espere. Uma vida pode depender de voce.
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
              Se voce suspeita que uma crianca ou adolescente esta em situacao
              de risco, denuncie agora. Sua acao pode ser a diferenca entre a
              violencia e a protecao.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
              >
                <Link href="/denuncia">
                  Fazer Denuncia Online
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 gap-2"
              >
                <a href="tel:100">
                  <Phone className="h-4 w-4" />
                  Disque 100
                </a>
              </Button>
            </div>

            <p className="mt-6 text-sm text-primary-foreground/60">
              A ligacao para o Disque 100 e gratuita e funciona 24 horas,
              inclusive feriados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
