"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Clock, Phone } from "lucide-react";

interface Operacional {
  id: string;
  nome: string;
  cargo: string;
  status: "em_campo" | "na_unidade" | "em_retorno";
  localizacao: string;
  regiao: string;
  horaSaida?: string;
  telefone: string;
  atendimento?: string;
}

const operacionais: Operacional[] = [
  {
    id: "1",
    nome: "Carlos Eduardo Silva",
    cargo: "Conselheiro Tutelar",
    status: "em_campo",
    localizacao: "Rua das Flores, 234 - Zona Norte",
    regiao: "norte",
    horaSaida: "08:30",
    telefone: "(11) 98765-4321",
    atendimento: "Verificação de denúncia #1247",
  },
  {
    id: "2",
    nome: "Ana Paula Oliveira",
    cargo: "Conselheira Tutelar",
    status: "em_campo",
    localizacao: "Av. Brasil, 1890 - Centro",
    regiao: "centro",
    horaSaida: "09:15",
    telefone: "(11) 98765-4322",
    atendimento: "Acompanhamento familiar #1198",
  },
  {
    id: "3",
    nome: "Roberto Santos",
    cargo: "Conselheiro Tutelar",
    status: "em_retorno",
    localizacao: "Retornando da Zona Leste",
    regiao: "leste",
    horaSaida: "07:45",
    telefone: "(11) 98765-4323",
    atendimento: "Visita IML concluída",
  },
  {
    id: "4",
    nome: "Mariana Costa",
    cargo: "Conselheira Tutelar",
    status: "na_unidade",
    localizacao: "Sede - Conselho Tutelar",
    regiao: "sede",
    telefone: "(11) 98765-4324",
  },
  {
    id: "5",
    nome: "Fernando Lima",
    cargo: "Conselheiro Tutelar",
    status: "em_campo",
    localizacao: "Escola Municipal José de Alencar - Zona Sul",
    regiao: "sul",
    horaSaida: "10:00",
    telefone: "(11) 98765-4325",
    atendimento: "Reunião escolar #1252",
  },
];

const statusConfig = {
  em_campo: {
    label: "Em Campo",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    dot: "bg-blue-500",
  },
  na_unidade: {
    label: "Na Unidade",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    dot: "bg-emerald-500",
  },
  em_retorno: {
    label: "Em Retorno",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    dot: "bg-amber-500",
  },
};

const regiaoPositions: Record<string, string> = {
  norte: "top-4 left-1/3",
  sul: "bottom-8 left-1/3",
  leste: "top-1/3 right-4",
  oeste: "top-1/3 left-4",
  centro: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  sede: "bottom-4 right-4",
};

export function MapaOperacionais() {
  const [selectedOperacional, setSelectedOperacional] = useState<string | null>(null);

  const emCampo = operacionais.filter((o) => o.status === "em_campo").length;
  const naUnidade = operacionais.filter((o) => o.status === "na_unidade").length;
  const emRetorno = operacionais.filter((o) => o.status === "em_retorno").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg">Localização da Equipe em Campo</CardTitle>
            <CardDescription>
              Acompanhamento em tempo real dos operacionais
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {emCampo} em campo
            </Badge>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
              {naUnidade} na unidade
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700">
              {emRetorno} em retorno
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Mapa Visual */}
          <div className="relative aspect-square rounded-lg border border-border bg-muted/20 p-4">
            {/* Grid de fundo */}
            <div className="absolute inset-4 grid grid-cols-4 grid-rows-4 gap-1 opacity-20">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="rounded border border-border" />
              ))}
            </div>

            {/* Marcadores dos operacionais */}
            {operacionais.map((op) => (
              <button
                key={op.id}
                type="button"
                onClick={() => setSelectedOperacional(op.id === selectedOperacional ? null : op.id)}
                className={`absolute flex items-center justify-center transition-all ${regiaoPositions[op.regiao]} ${
                  selectedOperacional === op.id ? "z-20 scale-125" : "z-10"
                }`}
              >
                <div className="relative">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-card bg-primary shadow-lg ${
                      selectedOperacional === op.id ? "ring-2 ring-accent ring-offset-2" : ""
                    }`}
                  >
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span
                    className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-card ${statusConfig[op.status].dot}`}
                  />
                </div>
              </button>
            ))}

            {/* Legenda no mapa */}
            <div className="absolute bottom-2 left-2 rounded-md bg-card/90 p-2 text-xs shadow-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-primary" />
                <span className="text-muted-foreground">Clique para detalhes</span>
              </div>
            </div>
          </div>

          {/* Lista de Operacionais */}
          <div className="space-y-3">
            {operacionais.map((op) => (
              <button
                key={op.id}
                type="button"
                onClick={() => setSelectedOperacional(op.id === selectedOperacional ? null : op.id)}
                className={`w-full rounded-lg border p-4 text-left transition-all hover:border-primary/50 hover:shadow-sm ${
                  selectedOperacional === op.id
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card ${statusConfig[op.status].dot}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{op.nome}</p>
                      <p className="text-sm text-muted-foreground">{op.cargo}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={statusConfig[op.status].color}>
                    {statusConfig[op.status].label}
                  </Badge>
                </div>

                {selectedOperacional === op.id && (
                  <div className="mt-4 space-y-2 border-t border-border pt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{op.localizacao}</span>
                    </div>
                    {op.horaSaida && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Saída: {op.horaSaida}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{op.telefone}</span>
                    </div>
                    {op.atendimento && (
                      <div className="mt-2 rounded-md bg-muted/50 p-2">
                        <p className="text-sm font-medium text-foreground">
                          Atendimento atual:
                        </p>
                        <p className="text-sm text-muted-foreground">{op.atendimento}</p>
                      </div>
                    )}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
