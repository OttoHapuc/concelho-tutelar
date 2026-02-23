"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  AlertTriangle,
  ChevronRight,
  Baby,
  MapPin,
  AlertCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface Denuncia {
  id: string;
  protocolo: string;
  dataRegistro: Date;
  tipoViolencia: string;
  prioridade: "critica" | "alta" | "media" | "baixa";
  risco: number; // 1-10
  vitima: {
    nome: string;
    idade: number;
  };
  mae: string;
  agressor: string;
  endereco: {
    rua: string;
    bairro: string;
    numero: string;
    cidade: string;
  };
  status: string;
  tempoSemAtendimento: number; // em horas
}

const mockDenuncias: Denuncia[] = [
  {
    id: "1",
    protocolo: "CT-2024-001547",
    dataRegistro: new Date(Date.now() - 72 * 60 * 60 * 1000),
    tipoViolencia: "Maus-tratos",
    prioridade: "critica",
    risco: 9,
    vitima: { nome: "Maria Silva", idade: 7 },
    mae: "Ana Paula Silva",
    agressor: "José Carlos Silva",
    endereco: {
      rua: "Rua das Flores",
      bairro: "Centro",
      numero: "123",
      cidade: "São Paulo",
    },
    status: "Aguardando atendimento",
    tempoSemAtendimento: 72,
  },
  {
    id: "2",
    protocolo: "CT-2024-001548",
    dataRegistro: new Date(Date.now() - 48 * 60 * 60 * 1000),
    tipoViolencia: "Negligência",
    prioridade: "alta",
    risco: 7,
    vitima: { nome: "Pedro Santos", idade: 5 },
    mae: "Carla Santos",
    agressor: "Roberto Santos",
    endereco: {
      rua: "Av. Brasil",
      bairro: "Jardim América",
      numero: "456",
      cidade: "São Paulo",
    },
    status: "Aguardando atendimento",
    tempoSemAtendimento: 48,
  },
  {
    id: "3",
    protocolo: "CT-2024-001549",
    dataRegistro: new Date(Date.now() - 24 * 60 * 60 * 1000),
    tipoViolencia: "Abuso Psicológico",
    prioridade: "media",
    risco: 5,
    vitima: { nome: "Lucas Oliveira", idade: 10 },
    mae: "Fernanda Oliveira",
    agressor: "Marcos Oliveira",
    endereco: {
      rua: "Rua São João",
      bairro: "Vila Nova",
      numero: "789",
      cidade: "São Paulo",
    },
    status: "Aguardando atendimento",
    tempoSemAtendimento: 24,
  },
  {
    id: "4",
    protocolo: "CT-2024-001550",
    dataRegistro: new Date(Date.now() - 96 * 60 * 60 * 1000),
    tipoViolencia: "Abandono",
    prioridade: "critica",
    risco: 10,
    vitima: { nome: "Julia Costa", idade: 3 },
    mae: "Desconhecida",
    agressor: "Desconhecido",
    endereco: {
      rua: "Praça Central",
      bairro: "Centro",
      numero: "S/N",
      cidade: "São Paulo",
    },
    status: "Aguardando atendimento",
    tempoSemAtendimento: 96,
  },
  {
    id: "5",
    protocolo: "CT-2024-001551",
    dataRegistro: new Date(Date.now() - 12 * 60 * 60 * 1000),
    tipoViolencia: "Violência Física",
    prioridade: "alta",
    risco: 8,
    vitima: { nome: "Beatriz Lima", idade: 12 },
    mae: "Patrícia Lima",
    agressor: "Eduardo Lima",
    endereco: {
      rua: "Rua das Palmeiras",
      bairro: "Jardim Europa",
      numero: "321",
      cidade: "São Paulo",
    },
    status: "Aguardando atendimento",
    tempoSemAtendimento: 12,
  },
  {
    id: "6",
    protocolo: "CT-2024-001552",
    dataRegistro: new Date(Date.now() - 6 * 60 * 60 * 1000),
    tipoViolencia: "Trabalho Infantil",
    prioridade: "media",
    risco: 6,
    vitima: { nome: "Rafael Souza", idade: 14 },
    mae: "Sandra Souza",
    agressor: "Comércio Local",
    endereco: {
      rua: "Rua do Comércio",
      bairro: "Centro",
      numero: "50",
      cidade: "São Paulo",
    },
    status: "Aguardando atendimento",
    tempoSemAtendimento: 6,
  },
];

const prioridadeConfig = {
  critica: { label: "Crítica", color: "bg-red-600 text-white" },
  alta: { label: "Alta", color: "bg-orange-500 text-white" },
  media: { label: "Média", color: "bg-yellow-500 text-foreground" },
  baixa: { label: "Baixa", color: "bg-blue-500 text-white" },
};

interface ListagemDenunciasProps {
  onSelectDenuncia: (denuncia: Denuncia) => void;
  selectedId?: string;
}

export function ListagemDenuncias({
  onSelectDenuncia,
  selectedId,
}: ListagemDenunciasProps) {
  const [busca, setBusca] = useState("");
  const [filtroPrioridade, setFiltroPrioridade] = useState<string>("todas");
  const [ordenacao, setOrdenacao] = useState<string>("score");

  // Calcula score de urgência (combinação de prioridade, risco e tempo)
  const calcularScore = (d: Denuncia) => {
    const prioridadeScore = { critica: 100, alta: 75, media: 50, baixa: 25 };
    return (
      prioridadeScore[d.prioridade] +
      d.risco * 5 +
      Math.min(d.tempoSemAtendimento, 100)
    );
  };

  const denunciasFiltradas = mockDenuncias
    .filter((d) => {
      const matchBusca =
        busca === "" ||
        d.protocolo.toLowerCase().includes(busca.toLowerCase()) ||
        d.vitima.nome.toLowerCase().includes(busca.toLowerCase()) ||
        d.mae.toLowerCase().includes(busca.toLowerCase()) ||
        d.agressor.toLowerCase().includes(busca.toLowerCase()) ||
        d.endereco.bairro.toLowerCase().includes(busca.toLowerCase());

      const matchPrioridade =
        filtroPrioridade === "todas" || d.prioridade === filtroPrioridade;

      return matchBusca && matchPrioridade;
    })
    .sort((a, b) => {
      switch (ordenacao) {
        case "score":
          return calcularScore(b) - calcularScore(a);
        case "tempo":
          return b.tempoSemAtendimento - a.tempoSemAtendimento;
        case "risco":
          return b.risco - a.risco;
        case "data":
          return a.dataRegistro.getTime() - b.dataRegistro.getTime();
        default:
          return 0;
      }
    });

  const formatarTempo = (horas: number) => {
    if (horas < 24) return `${horas}h`;
    const dias = Math.floor(horas / 24);
    const horasRestantes = horas % 24;
    return `${dias}d ${horasRestantes}h`;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <AlertTriangle className="h-5 w-5 text-accent" />
          Denúncias Pendentes
        </CardTitle>

        {/* Filtros */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por protocolo, nome, endereço..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filtroPrioridade} onValueChange={setFiltroPrioridade}>
              <SelectTrigger className="flex-1">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas</SelectItem>
                <SelectItem value="critica">Crítica</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
            <Select value={ordenacao} onValueChange={setOrdenacao}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Urgência (Score)</SelectItem>
                <SelectItem value="tempo">Tempo sem atendimento</SelectItem>
                <SelectItem value="risco">Nível de risco</SelectItem>
                <SelectItem value="data">Data de registro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-2">
          {denunciasFiltradas.map((denuncia) => (
            <button
              key={denuncia.id}
              onClick={() => onSelectDenuncia(denuncia)}
              className={cn(
                "w-full text-left p-4 rounded-lg border transition-all hover:shadow-md",
                selectedId === denuncia.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={prioridadeConfig[denuncia.prioridade].color}>
                    {prioridadeConfig[denuncia.prioridade].label}
                  </Badge>
                  <span className="text-xs font-mono text-muted-foreground">
                    {denuncia.protocolo}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm">
                  <Baby className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-medium">{denuncia.vitima.nome}</span>
                  <span className="text-muted-foreground">
                    ({denuncia.vitima.idade} anos)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">
                    {denuncia.endereco.bairro} - {denuncia.endereco.rua}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/50 mt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs">
                      <AlertCircle
                        className={cn(
                          "h-3.5 w-3.5",
                          denuncia.risco >= 8
                            ? "text-red-500"
                            : denuncia.risco >= 5
                              ? "text-orange-500"
                              : "text-yellow-500"
                        )}
                      />
                      <span>Risco: {denuncia.risco}/10</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      <span
                        className={cn(
                          denuncia.tempoSemAtendimento >= 48 && "text-red-500 font-medium"
                        )}
                      >
                        {formatarTempo(denuncia.tempoSemAtendimento)}
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {denuncia.tipoViolencia}
                  </Badge>
                </div>
              </div>
            </button>
          ))}

          {denunciasFiltradas.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma denúncia encontrada</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
