import { DenunciaForm } from "@/app/(public)/denuncia/components/page.denuncia.denuncia-form";

export default function DenunciaDashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Registrar Nova Denúncia
        </h1>
        <p className="text-muted-foreground">
          Preencha o formulário abaixo para registrar uma nova denúncia no
          sistema
        </p>
      </div>

      {/* Formulário */}
      <DenunciaForm />
    </div>
  );
}
