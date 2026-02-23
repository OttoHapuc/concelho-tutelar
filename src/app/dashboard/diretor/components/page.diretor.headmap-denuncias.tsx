"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Periodo = "hoje" | "semana" | "mes" | "ano";

interface RegiaoData {
  id: string;
  nome: string;
  denuncias: number;
  intensidade: "baixa" | "media" | "alta" | "critica";
}

const dadosPorPeriodo: Record<Periodo, RegiaoData[]> = {
  hoje: [
    { id: "1", nome: "Centro", denuncias: 3, intensidade: "media" },
    { id: "2", nome: "Zona Norte", denuncias: 5, intensidade: "alta" },
    { id: "3", nome: "Zona Sul", denuncias: 1, intensidade: "baixa" },
    { id: "4", nome: "Zona Leste", denuncias: 7, intensidade: "critica" },
    { id: "5", nome: "Zona Oeste", denuncias: 2, intensidade: "baixa" },
    { id: "6", nome: "Distrito Industrial", denuncias: 0, intensidade: "baixa" },
  ],
  semana: [
    { id: "1", nome: "Centro", denuncias: 12, intensidade: "alta" },
    { id: "2", nome: "Zona Norte", denuncias: 18, intensidade: "critica" },
    { id: "3", nome: "Zona Sul", denuncias: 6, intensidade: "media" },
    { id: "4", nome: "Zona Leste", denuncias: 24, intensidade: "critica" },
    { id: "5", nome: "Zona Oeste", denuncias: 8, intensidade: "media" },
    { id: "6", nome: "Distrito Industrial", denuncias: 3, intensidade: "baixa" },
  ],
  mes: [
    { id: "1", nome: "Centro", denuncias: 45, intensidade: "alta" },
    { id: "2", nome: "Zona Norte", denuncias: 67, intensidade: "critica" },
    { id: "3", nome: "Zona Sul", denuncias: 23, intensidade: "media" },
    { id: "4", nome: "Zona Leste", denuncias: 89, intensidade: "critica" },
    { id: "5", nome: "Zona Oeste", denuncias: 31, intensidade: "media" },
    { id: "6", nome: "Distrito Industrial", denuncias: 12, intensidade: "baixa" },
  ],
  ano: [
    { id: "1", nome: "Centro", denuncias: 523, intensidade: "alta" },
    { id: "2", nome: "Zona Norte", denuncias: 712, intensidade: "critica" },
    { id: "3", nome: "Zona Sul", denuncias: 298, intensidade: "media" },
    { id: "4", nome: "Zona Leste", denuncias: 945, intensidade: "critica" },
    { id: "5", nome: "Zona Oeste", denuncias: 387, intensidade: "media" },
    { id: "6", nome: "Distrito Industrial", denuncias: 156, intensidade: "baixa" },
  ],
};

const intensidadeCores = {
  baixa: "bg-emerald-100 border-emerald-300 text-emerald-800",
  media: "bg-amber-100 border-amber-300 text-amber-800",
  alta: "bg-orange-200 border-orange-400 text-orange-900",
  critica: "bg-red-200 border-red-400 text-red-900",
};

const intensidadeMapaCores = {
  baixa: "bg-emerald-200/60",
  media: "bg-amber-300/70",
  alta: "bg-orange-400/80",
  critica: "bg-red-500/90",
};

export function HeatmapDenuncias() {
  const [periodo, setPeriodo] = useState<Periodo>("hoje");
  const dados = dadosPorPeriodo[periodo];
  const totalDenuncias = dados.reduce((acc, r) => acc + r.denuncias, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg">Mapa de Calor - Denúncias por Região</CardTitle>
            <CardDescription>
              Visualização geográfica da concentração de denúncias
            </CardDescription>
          </div>
          <Select value={periodo} onValueChange={(v) => setPeriodo(v as Periodo)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="semana">Esta Semana</SelectItem>
              <SelectItem value="mes">Este Mês</SelectItem>
              <SelectItem value="ano">Este Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Mapa Visual Simplificado */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[4/3] rounded-lg border border-border bg-muted/30 p-4">
              {/* Grid do mapa simulado */}
              <div className="grid h-full grid-cols-3 grid-rows-2 gap-2">
                {/* Zona Norte */}
                <div
                  className={`col-span-2 flex items-center justify-center rounded-lg border-2 transition-all ${intensidadeMapaCores[dados[1].intensidade]}`}
                >
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">Zona Norte</p>
                    <p className="text-2xl font-bold text-foreground">{dados[1].denuncias}</p>
                  </div>
                </div>
                {/* Zona Leste */}
                <div
                  className={`row-span-2 flex items-center justify-center rounded-lg border-2 transition-all ${intensidadeMapaCores[dados[3].intensidade]}`}
                >
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">Zona Leste</p>
                    <p className="text-2xl font-bold text-foreground">{dados[3].denuncias}</p>
                  </div>
                </div>
                {/* Zona Oeste */}
                <div
                  className={`flex items-center justify-center rounded-lg border-2 transition-all ${intensidadeMapaCores[dados[4].intensidade]}`}
                >
                  <div className="text-center">
                    <p className="text-xs font-semibold text-foreground">Zona Oeste</p>
                    <p className="text-xl font-bold text-foreground">{dados[4].denuncias}</p>
                  </div>
                </div>
                {/* Centro */}
                <div
                  className={`flex items-center justify-center rounded-lg border-2 transition-all ${intensidadeMapaCores[dados[0].intensidade]}`}
                >
                  <div className="text-center">
                    <p className="text-xs font-semibold text-foreground">Centro</p>
                    <p className="text-xl font-bold text-foreground">{dados[0].denuncias}</p>
                  </div>
                </div>
              </div>
              {/* Zona Sul - Sobreposta */}
              <div
                className={`absolute bottom-6 left-1/4 right-1/3 flex h-16 items-center justify-center rounded-lg border-2 transition-all ${intensidadeMapaCores[dados[2].intensidade]}`}
              >
                <div className="text-center">
                  <p className="text-xs font-semibold text-foreground">Zona Sul</p>
                  <p className="text-lg font-bold text-foreground">{dados[2].denuncias}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legenda e Lista */}
          <div className="space-y-4">
            {/* Legenda */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="mb-3 text-sm font-semibold text-foreground">Legenda</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-emerald-200/60" />
                  <span className="text-sm text-muted-foreground">Baixa incidência</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-amber-300/70" />
                  <span className="text-sm text-muted-foreground">Média incidência</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-orange-400/80" />
                  <span className="text-sm text-muted-foreground">Alta incidência</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-red-500/90" />
                  <span className="text-sm text-muted-foreground">Incidência crítica</span>
                </div>
              </div>
            </div>

            {/* Resumo por região */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Total: {totalDenuncias} denúncias
              </h4>
              <div className="space-y-2">
                {dados
                  .sort((a, b) => b.denuncias - a.denuncias)
                  .map((regiao) => (
                    <div
                      key={regiao.id}
                      className={`flex items-center justify-between rounded-md border px-3 py-2 ${intensidadeCores[regiao.intensidade]}`}
                    >
                      <span className="text-sm font-medium">{regiao.nome}</span>
                      <span className="text-sm font-bold">{regiao.denuncias}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
