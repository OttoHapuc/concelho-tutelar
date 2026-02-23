import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-foreground/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground">
            <Shield className="h-4 w-4" />
            <span>Conselho Tutelar - Protecao Integral</span>
          </div>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
            Sua denuncia pode salvar uma vida
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            Toda crianca e adolescente tem direito a protecao. Quando voce
            denuncia maus-tratos, negligencia ou abuso, voce se torna um agente
            de transformacao e esperanca. Nao se cale. Denuncie.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2"
            >
              <Link href="/denuncia">
                Fazer Denuncia
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="#importancia">Entenda a Importancia</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
