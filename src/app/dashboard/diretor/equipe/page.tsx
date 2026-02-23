import { PainelAcoes } from "./components/page.equipe.painel-acoes";
import { MapaOperacionais } from "./components/page.equipe.mapa-operacionais";

export default function EquipePage() {
  return (
    <div className="space-y-6  lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Equipe em Campo
        </h1>
        <p className="text-muted-foreground">
          Acompanhamento em tempo real da localização e atividades dos operacionais
        </p>
      </div>

      {/* Mapa de Operacionais */}
      <MapaOperacionais />

      {/* Painel de Ações */}
      <PainelAcoes />
    </div>
  );
}
