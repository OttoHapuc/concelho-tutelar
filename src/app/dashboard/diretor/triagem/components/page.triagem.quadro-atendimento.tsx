"use client";

import { useState } from "react";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Atendimento {
  id: string;
  protocolo: string;
  horario: string;
  duracao: number; // em minutos
  vitima: string;
  endereco: string;
  tipo: string;
  status: "agendado" | "em_andamento" | "concluido" | "cancelado";
  prioridade: "critica" | "alta" | "media" | "baixa";
}

interface Operacional {
  id: string;
  nome: string;
  iniciais: string;
  cor: string;
  atendimentos: Atendimento[];
}

const horariosTrabalho = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

const mockOperacionais: Operacional[] = [
  {
    id: "op1",
    nome: "Maria Conselheira",
    iniciais: "MC",
    cor: "bg-blue-500",
    atendimentos: [
      {
        id: "a1",
        protocolo: "CT-2024-001547",
        horario: "08:00",
        duracao: 120,
        vitima: "Maria Silva",
        endereco: "Centro",
        tipo: "Maus-tratos",
        status: "concluido",
        prioridade: "critica",
      },
      {
        id: "a2",
        protocolo: "CT-2024-001550",
        horario: "11:00",
        duracao: 90,
        vitima: "Julia Costa",
        endereco: "Centro",
        tipo: "Abandono",
        status: "em_andamento",
        prioridade: "critica",
      },
      {
        id: "a3",
        protocolo: "CT-2024-001555",
        horario: "14:00",
        duracao: 60,
        vitima: "Lucas Pereira",
        endereco: "Jardim América",
        tipo: "Negligência",
        status: "agendado",
        prioridade: "media",
      },
    ],
  },
  {
    id: "op2",
    nome: "João Conselheiro",
    iniciais: "JC",
    cor: "bg-green-500",
    atendimentos: [
      {
        id: "a4",
        protocolo: "CT-2024-001548",
        horario: "09:00",
        duracao: 90,
        vitima: "Pedro Santos",
        endereco: "Jardim América",
        tipo: "Negligência",
        status: "concluido",
        prioridade: "alta",
      },
      {
        id: "a5",
        protocolo: "CT-2024-001551",
        horario: "13:00",
        duracao: 120,
        vitima: "Beatriz Lima",
        endereco: "Jardim Europa",
        tipo: "Violência Física",
        status: "em_andamento",
        prioridade: "alta",
      },
    ],
  },
  {
    id: "op3",
    nome: "Ana Conselheira",
    iniciais: "AC",
    cor: "bg-purple-500",
    atendimentos: [
      {
        id: "a6",
        protocolo: "CT-2024-001549",
        horario: "10:00",
        duracao: 60,
        vitima: "Lucas Oliveira",
        endereco: "Vila Nova",
        tipo: "Abuso Psicológico",
        status: "concluido",
        prioridade: "media",
      },
      {
        id: "a7",
        protocolo: "CT-2024-001556",
        horario: "15:00",
        duracao: 90,
        vitima: "Carla Mendes",
        endereco: "Centro",
        tipo: "Negligência",
        status: "agendado",
        prioridade: "media",
      },
    ],
  },
  {
    id: "op4",
    nome: "Carlos Conselheiro",
    iniciais: "CC",
    cor: "bg-orange-500",
    atendimentos: [
      {
        id: "a8",
        protocolo: "CT-2024-001552",
        horario: "08:00",
        duracao: 60,
        vitima: "Rafael Souza",
        endereco: "Centro",
        tipo: "Trabalho Infantil",
        status: "concluido",
        prioridade: "media",
      },
      {
        id: "a9",
        protocolo: "CT-2024-001557",
        horario: "10:00",
        duracao: 120,
        vitima: "Fernanda Reis",
        endereco: "Vila Industrial",
        tipo: "Maus-tratos",
        status: "em_andamento",
        prioridade: "alta",
      },
      {
        id: "a10",
        protocolo: "CT-2024-001558",
        horario: "16:00",
        duracao: 60,
        vitima: "Gabriel Santos",
        endereco: "Jardim Europa",
        tipo: "Negligência",
        status: "cancelado",
        prioridade: "baixa",
      },
    ],
  },
];

const statusConfig = {
  agendado: { label: "Agendado", color: "bg-blue-100 text-blue-700", icon: Clock },
  em_andamento: { label: "Em Andamento", color: "bg-yellow-100 text-yellow-700", icon: AlertTriangle },
  concluido: { label: "Concluído", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-700", icon: XCircle },
};

const prioridadeColors = {
  critica: "border-l-red-500",
  alta: "border-l-orange-500",
  media: "border-l-yellow-500",
  baixa: "border-l-blue-500",
};

interface QuadroAtendimentoProps {
  onAgendar?: (operacionalId: string, horario: string) => void;
}

export function QuadroAtendimento({ onAgendar }: QuadroAtendimentoProps) {
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<{ opId: string; horario: string } | null>(null);

  const formatarData = (data: Date) => {
    return data.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const navegarData = (direcao: "anterior" | "proximo") => {
    const novaData = new Date(dataSelecionada);
    novaData.setDate(novaData.getDate() + (direcao === "proximo" ? 1 : -1));
    setDataSelecionada(novaData);
  };

  const getAtendimentoNoHorario = (operacional: Operacional, horario: string) => {
    return operacional.atendimentos.find((a) => a.horario === horario);
  };

  const getAtendimentoOcupandoSlot = (operacional: Operacional, horario: string) => {
    const horaAtual = parseInt(horario.split(":")[0]);
    return operacional.atendimentos.find((a) => {
      const horaInicio = parseInt(a.horario.split(":")[0]);
      const horaFim = horaInicio + Math.ceil(a.duracao / 60);
      return horaAtual > horaInicio && horaAtual < horaFim;
    });
  };

  const handleSlotClick = (opId: string, horario: string) => {
    setSelectedSlot({ opId, horario });
    onAgendar?.(opId, horario);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Quadro de Atendimento
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navegarData("anterior")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDataSelecionada(new Date())}
            >
              Hoje
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navegarData("proximo")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground capitalize mt-2">
          {formatarData(dataSelecionada)}
        </p>

        {/* Legenda */}
        <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
          {Object.entries(statusConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs">
              <div className={cn("w-3 h-3 rounded", config.color)} />
              <span className="text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto">
        <div className="min-w-[800px]">
          {/* Header com operacionais */}
          <div className="grid grid-cols-[80px_repeat(4,1fr)] gap-2 mb-2 sticky top-0 bg-card z-10 pb-2">
            <div className="text-xs font-medium text-muted-foreground text-center">
              Horário
            </div>
            {mockOperacionais.map((op) => (
              <div key={op.id} className="flex items-center gap-2 justify-center">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className={cn("text-white text-xs", op.cor)}>
                    {op.iniciais}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden xl:inline">
                  {op.nome.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Grid de horários */}
          <div className="space-y-1">
            {horariosTrabalho.map((horario) => (
              <div
                key={horario}
                className="grid grid-cols-[80px_repeat(4,1fr)] gap-2"
              >
                <div className="text-sm text-muted-foreground flex items-center justify-center h-20 font-mono">
                  {horario}
                </div>

                {mockOperacionais.map((op) => {
                  const atendimento = getAtendimentoNoHorario(op, horario);
                  const atendimentoOcupando = getAtendimentoOcupandoSlot(op, horario);

                  if (atendimentoOcupando) {
                    return <div key={`${op.id}-${horario}`} className="h-20" />;
                  }

                  if (atendimento) {
                    const status = statusConfig[atendimento.status];
                    const StatusIcon = status.icon;
                    const slotsOcupados = Math.ceil(atendimento.duracao / 60);

                    return (
                      <div
                        key={`${op.id}-${horario}`}
                        className={cn(
                          "rounded-lg border-l-4 p-2 transition-all hover:shadow-md cursor-pointer",
                          prioridadeColors[atendimento.prioridade],
                          status.color
                        )}
                        style={{ height: `${slotsOcupados * 80 + (slotsOcupados - 1) * 4}px` }}
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span className="text-xs font-mono truncate">
                            {atendimento.protocolo.slice(-6)}
                          </span>
                          <StatusIcon className="h-3.5 w-3.5 flex-shrink-0" />
                        </div>
                        <p className="text-sm font-medium truncate mt-1">
                          {atendimento.vitima}
                        </p>
                        <div className="flex items-center gap-1 text-xs mt-1 opacity-80">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{atendimento.endereco}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs mt-1 opacity-80">
                          <Clock className="h-3 w-3" />
                          <span>{atendimento.duracao} min</span>
                        </div>
                      </div>
                    );
                  }

                  // Slot vazio - disponível para agendamento
                  return (
                    <button
                      key={`${op.id}-${horario}`}
                      onClick={() => handleSlotClick(op.id, horario)}
                      className={cn(
                        "h-20 rounded-lg border-2 border-dashed transition-all",
                        selectedSlot?.opId === op.id && selectedSlot?.horario === horario
                          ? "border-primary bg-primary/10"
                          : "border-muted hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <div className="h-full flex items-center justify-center">
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
