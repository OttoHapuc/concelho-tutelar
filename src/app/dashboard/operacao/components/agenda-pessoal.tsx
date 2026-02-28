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
  MoreVertical,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

const horariosTrabalho = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

// Mock de atendimentos do usuário logado
const mockMeusAtendimentos: Atendimento[] = [
  {
    id: "a1",
    protocolo: "CT-2024-001547",
    horario: "08:00",
    duracao: 120,
    vitima: "Maria Silva",
    endereco: "Rua das Flores, 123 - Centro",
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
    endereco: "Av. Paulista, 500 - Centro",
    tipo: "Abandono",
    status: "em_andamento",
    prioridade: "alta",
  },
  {
    id: "a3",
    protocolo: "CT-2024-001555",
    horario: "14:00",
    duracao: 60,
    vitima: "Lucas Pereira",
    endereco: "Rua A, 45 - Jardim América",
    tipo: "Negligência",
    status: "agendado",
    prioridade: "media",
  },
];

const statusConfig = {
  agendado: { label: "Agendado", color: "bg-blue-100 text-blue-700", icon: Clock },
  em_andamento: { label: "Em Andamento", color: "bg-amber-100 text-amber-700", icon: AlertTriangle },
  concluido: { label: "Concluído", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-700", icon: XCircle },
};

const prioridadeColors = {
  critica: "border-l-red-500",
  alta: "border-l-orange-500",
  media: "border-l-yellow-500",
  baixa: "border-l-blue-500",
};

export function AgendaPessoal() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getAtendimentoNoHorario = (horario: string) => {
    return mockMeusAtendimentos.find((a) => a.horario.startsWith(horario.split(":")[0]));
  };

  return (
    <div className="flex flex-col h-full bg-background rounded-lg border shadow-sm">
      {/* Header do Calendário */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-lg">Minha Agenda</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium capitalize min-w-[200px] text-center">
            {formattedDate}
          </span>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="ml-2">
            Hoje
          </Button>
        </div>
      </div>

      {/* Legenda */}
      <div className="flex flex-wrap gap-4 p-4 bg-muted/30 text-xs">
        {Object.entries(statusConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${config.color.split(" ")[0].replace("bg-", "bg-")}`} />
            <span className="text-muted-foreground">{config.label}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {horariosTrabalho.map((horario) => {
          const atendimento = getAtendimentoNoHorario(horario);

          return (
            <div key={horario} className="flex gap-4 group">
              {/* Coluna de Horário */}
              <div className="w-16 flex-shrink-0 flex flex-col items-center">
                <span className="text-sm font-medium text-muted-foreground">{horario}</span>
                <div className="flex-1 w-px bg-border my-2 group-last:hidden" />
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-h-[80px] pb-4">
                {atendimento ? (
                  <Card className={cn(
                    "h-full border-l-4 transition-all hover:shadow-md",
                    prioridadeColors[atendimento.prioridade]
                  )}>
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0 h-5", statusConfig[atendimento.status].color)}>
                            {statusConfig[atendimento.status].label}
                          </Badge>
                          <span className="font-semibold text-sm">{atendimento.vitima}</span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <span className="font-medium">Protocolo:</span> {atendimento.protocolo}
                        </div>
                        
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {atendimento.endereco}
                        </div>
                      </div>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-2">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-48 p-1">
                          <div className="flex flex-col gap-1">
                            <Button variant="ghost" className="justify-start h-8 px-2 text-sm font-normal">Ver Detalhes</Button>
                            <Button variant="ghost" className="justify-start h-8 px-2 text-sm font-normal">Reagendar</Button>
                            <Button variant="ghost" className="justify-start h-8 px-2 text-sm font-normal text-red-600 hover:text-red-600 hover:bg-red-50">Cancelar</Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-full border border-dashed rounded-lg flex items-center justify-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer group/slot">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover/slot:opacity-100 transition-opacity gap-2">
                      <Plus className="h-4 w-4" />
                      Agendar Horário
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
