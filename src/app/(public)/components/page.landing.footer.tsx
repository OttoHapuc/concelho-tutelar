import { Shield, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/10">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold">Conselho Tutelar</p>
                <p className="text-sm text-primary-foreground/70">
                  Protegendo Vidas
                </p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Orgao permanente e autonomo, encarregado pela sociedade de zelar
              pelo cumprimento dos direitos da crianca e do adolescente.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Links Rapidos</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Pagina Inicial
              </Link>
              <Link
                href="/denuncia"
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Fazer Denuncia
              </Link>
              <Link
                href="/login"
                className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Administração
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contato de Emergencia</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 shrink-0" />
                <span>Disque 100 - Direitos Humanos</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Phone className="h-4 w-4 shrink-0" />
                <span>190 - Policia Militar</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Atendimento</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-primary-foreground/80">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Endereco da sede do Conselho Tutelar da sua cidade</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contato@conselhotutelar.gov.br</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-primary-foreground/60">
              2025 Conselho Tutelar. Todos os direitos reservados.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Em caso de emergencia, ligue 190
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
