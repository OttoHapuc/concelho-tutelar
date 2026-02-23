"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Denuncia } from "./page.triagem.listagem-denuncias";

interface Operacional {
  id: string;
  nome: string;
  iniciais: string;
  cor: string;
  disponivel: boolean;
  cargaAtual: number;
  especialidade: string;
}

const mockOperacionais: Operacional[] = [
  {
    id: "op1",
    nome: "Maria Conselheira",
    iniciais: "MC",
    cor: "bg-blue-500",
    disponivel: true,
    cargaAtual: 3,
    especialidade: "Maus-tratos",
  },
  {
    id: "op2",
    nome: "João Conselheiro",
    iniciais: "JC",
    cor: "bg-green-500",
    disponivel: true,
    cargaAtual: 2,
    especialidade: "Negligência",
  },
  {
    id: "op3",
    nome: "Ana Conselheira",
    iniciais: "AC",
    cor: "bg-purple-500",
    disponivel: false,
    cargaAtual: 4,
    especialidade: "Abuso Psicológico",
  },
  {
    id: "op4",
    nome: "Carlos Conselheiro",
    iniciais: "CC",
    cor: "bg-orange-500",
    disponivel: true,
    cargaAtual: 3,
    especialidade: "Violência Física",
  },
];

const tiposAtendimento = [
  { value: "reconhecimento", label: "Reconhecimento" },
  { value: "rotina", label: "Acompanhamento de Rotina" },
  { value: "iml", label: "Acompanhamento IML" },
  { value: "critico", label: "Acompanhamento Crítico" },
];

interface ModalDirecionarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  denuncia: Denuncia | null;
  onDirecionar: (dados: {
    operacionalId: string;
    tipoAtendimento: string;
    observacoes: string;
    dataAgendada: string;
    horarioAgendado: string;
  }) => void;
}

export function ModalDirecionar({
  open,
  onOpenChange,
  denuncia,
  onDirecionar,
}: ModalDirecionarProps) {
  const [operacionalSelecionado, setOperacionalSelecionado] = useState<string>("");
  const [tipoAtendimento, setTipoAtendimento] = useState<string>("");
  const [observacoes, setObservacoes] = useState("");
  const [dataAgendada, setDataAgendada] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [horarioAgendado, setHorarioAgendado] = useState("08:00");
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleDirecionar = async () => {
    if (!operacionalSelecionado || !tipoAtendimento) return;

    setEnviando(true);
    // Simula envio
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setEnviando(false);
    setSucesso(true);

    setTimeout(() => {
      onDirecionar({
        operacionalId: operacionalSelecionado,
        tipoAtendimento,
        observacoes,
        dataAgendada,
        horarioAgendado,
      });
      // Reset
      setOperacionalSelecionado("");
      setTipoAtendimento("");
      setObservacoes("");
      setSucesso(false);
      onOpenChange(false);
    }, 1500);
  };

  const operacionalInfo = mockOperacionais.find(
    (op) => op.id === operacionalSelecionado
  );

  if (!denuncia) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0">
        {sucesso ? (
          <div className="py-12 flex flex-col items-center justify-center p-6">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-700">
              Atendimento Direcionado
            </h3>
            <p className="text-muted-foreground mt-2 text-center">
              A denúncia foi direcionada para{" "}
              <strong>{operacionalInfo?.nome}</strong>
            </p>
          </div>
        ) : (
          <>
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Direcionar para Atendimento
              </DialogTitle>
              <DialogDescription>
                Atribua esta denúncia a um conselheiro para atendimento
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-6 py-2">
              {/* Info da Denúncia */}
              <div className="p-4 bg-muted/50 rounded-lg border mb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm text-muted-foreground">
                      {denuncia.protocolo}
                    </p>
                    <p className="font-semibold text-lg">{denuncia.vitima.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {denuncia.vitima.idade} anos
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={cn(
                        denuncia.prioridade === "critica" && "bg-red-600",
                        denuncia.prioridade === "alta" && "bg-orange-500",
                        denuncia.prioridade === "media" && "bg-yellow-500",
                        denuncia.prioridade === "baixa" && "bg-blue-500"
                      )}
                    >
                      Prioridade {denuncia.prioridade}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      Risco: {denuncia.risco}/10
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {denuncia.endereco.rua}, {denuncia.endereco.numero} -{" "}
                  {denuncia.endereco.bairro}
                </div>
              </div>

              <div className="grid gap-4">
              {/* Seleção de Operacional */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Selecione o Conselheiro
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {mockOperacionais.map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      disabled={!op.disponivel}
                      onClick={() => setOperacionalSelecionado(op.id)}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-all",
                        !op.disponivel && "opacity-50 cursor-not-allowed",
                        operacionalSelecionado === op.id
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={cn("text-white", op.cor)}>
                            {op.iniciais}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{op.nome}</p>
                          <p className="text-xs text-muted-foreground">
                            {op.especialidade}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t">
                        <span className="text-xs text-muted-foreground">
                          {op.cargaAtual} casos ativos
                        </span>
                        {op.disponivel ? (
                          <Badge variant="outline" className="text-green-600 text-xs">
                            Disponível
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-600 text-xs">
                            Em campo
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tipo de Atendimento */}
              <div>
                <Label htmlFor="tipo" className="text-sm font-medium">
                  Tipo de Atendimento
                </Label>
                <Select value={tipoAtendimento} onValueChange={setTipoAtendimento}>
                  <SelectTrigger id="tipo" className="mt-1.5">
                    <SelectValue placeholder="Selecione o tipo de atendimento" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposAtendimento.map((tipo) => (
                      <SelectItem key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data e Horário */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="data" className="text-sm font-medium">
                    Data do Atendimento
                  </Label>
                  <div className="relative mt-1.5">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="date"
                      id="data"
                      value={dataAgendada}
                      onChange={(e) => setDataAgendada(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-input rounded-md text-sm bg-background"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="horario" className="text-sm font-medium">
                    Horário
                  </Label>
                  <div className="relative mt-1.5">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <select
                      id="horario"
                      value={horarioAgendado}
                      onChange={(e) => setHorarioAgendado(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-input rounded-md text-sm bg-background appearance-none"
                    >
                      {[
                        "08:00", "09:00", "10:00", "11:00",
                        "13:00", "14:00", "15:00", "16:00", "17:00",
                      ].map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div>
                <Label htmlFor="obs" className="text-sm font-medium">
                  Observações para o Atendimento
                </Label>
                <Textarea
                  id="obs"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Informações adicionais, instruções especiais, pontos de atenção..."
                  className="mt-1.5 min-h-[80px]"
                />
              </div>
            </div>
            </div>

            <DialogFooter className="p-6 pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleDirecionar}
                disabled={!operacionalSelecionado || !tipoAtendimento || enviando}
              >
                {enviando ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Direcionando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Direcionar Atendimento
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
