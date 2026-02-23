
import { Shield } from "lucide-react"
import { Header } from "../components/page.landing.header"
import { DenunciaForm } from "./components/page.denuncia.denuncia-form"
import { Footer } from "../components/page.landing.footer"

export const metadata = {
  title: "Fazer Denuncia | Conselho Tutelar",
  description: "Faca uma denuncia de maus-tratos, negligencia ou abuso contra criancas e adolescentes. Sua denuncia pode ser anonima e e tratada com total sigilo.",
}

export default function DenunciaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm text-primary-foreground">
                <Shield className="h-4 w-4" />
                <span>Canal Seguro de Denuncia</span>
              </div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl text-balance">
                Faca sua denuncia com seguranca
              </h1>
              <p className="mt-4 text-lg text-primary-foreground/80 text-pretty">
                Seu relato e fundamental para proteger criancas e adolescentes. Todas as informacoes sao tratadas com sigilo absoluto.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <DenunciaForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
