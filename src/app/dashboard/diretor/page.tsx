import { HeatmapDenuncias } from "./components/page.diretor.headmap-denuncias";
import { StatsCardsDiretor } from "./components/page.diretor.stats-card";

export default function DiretorPage() {
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6  lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Panorama Geral
          </h1>
          <p className="text-muted-foreground capitalize">{dataAtual}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCardsDiretor />

      {/* Mapa de Calor */}
      <HeatmapDenuncias />

    </div>
  );
}
