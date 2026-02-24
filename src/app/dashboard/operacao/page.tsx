"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Send, Activity, AlertTriangle, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { AgendaPessoal } from "./components/agenda-pessoal";
import { ModalCondicao } from "./components/modal-condicao";
import { ModalRelatorio } from "./components/modal-relatorio";
import { ModalEncaminhamento } from "./components/modal-encaminhamento";
import { ModalAviso } from "./components/modal-aviso";
import { cn } from "@/lib/utils";

// Mock Data
interface Denuncia {
  id: string;
  protocolo: string;
  tipo: string;
  vitima: string;
  endereco: string;
  prioridade: "baixa" | "media" | "alta" | "critica";
  status: string;
  data: string;
  condicao?: string;
  temRelatorio: boolean;
  temEncaminhamento: boolean;
}

const mockDenuncias: Denuncia[] = [
  {
    id: "1",
    protocolo: "CT-2024-001547",
    tipo: "Maus-tratos",
    vitima: "Maria Silva",
    endereco: "Centro",
    prioridade: "critica",
    status: "em_andamento",
    data: "24/02/2026",
    condicao: "iniciada",
    temRelatorio: false,
    temEncaminhamento: false,
  },
  {
    id: "2",
    protocolo: "CT-2024-001550",
    tipo: "Abandono",
    vitima: "Julia Costa",
    endereco: "Centro",
    prioridade: "alta",
    status: "em_andamento",
    data: "23/02/2026",
    condicao: "requer_iml",
    temRelatorio: true,
    temEncaminhamento: false,
  },
  {
    id: "3",
    protocolo: "CT-2024-001555",
    tipo: "Negligência",
    vitima: "Lucas Pereira",
    endereco: "Jardim América",
    prioridade: "media",
    status: "agendado",
    data: "22/02/2026",
    condicao: "",
    temRelatorio: true,
    temEncaminhamento: true,
  },
];

export default function PageOperacao() {
  const [selectedDenuncia, setSelectedDenuncia] = useState<Denuncia | null>(null);
  
  // Modal States
  const [modalCondicaoOpen, setModalCondicaoOpen] = useState(false);
  const [modalRelatorioOpen, setModalRelatorioOpen] = useState(false);
  const [modalEncaminhamentoOpen, setModalEncaminhamentoOpen] = useState(false);
  
  // Warning Modals
  const [avisoRelatorioOpen, setAvisoRelatorioOpen] = useState(false);
  const [avisoEncaminhamentoOpen, setAvisoEncaminhamentoOpen] = useState(false);

  const handleRelatorioClick = () => {
    if (!selectedDenuncia) return;
    if (selectedDenuncia.temRelatorio) {
      setAvisoRelatorioOpen(true);
    } else {
      setModalRelatorioOpen(true);
    }
  };

  const handleEncaminhamentoClick = () => {
    if (!selectedDenuncia) return;
    if (selectedDenuncia.temEncaminhamento) {
      setAvisoEncaminhamentoOpen(true);
    } else {
      setModalEncaminhamentoOpen(true);
    }
  };

  const handleCondicaoConfirm = (condicao: string) => {
    console.log("Condição definida:", condicao);
    // Aqui atualizaria o estado da denúncia mockada
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Área Operacional</h1>
          <p className="text-muted-foreground">
            Gerencie suas denúncias atribuídas e acompanhe seu quadro de horários.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleRelatorioClick}
            disabled={!selectedDenuncia}
            className="gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            <FileText className="h-4 w-4" />
            Relatório
          </Button>
          
          <Button
            onClick={handleEncaminhamentoClick}
            disabled={!selectedDenuncia || !selectedDenuncia.temRelatorio}
            className="gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
            title={!selectedDenuncia?.temRelatorio ? "Requer relatório prévio" : ""}
          >
            <Send className="h-4 w-4" />
            Encaminhamento
          </Button>
          
          <Button
            onClick={() => setModalCondicaoOpen(true)}
            disabled={!selectedDenuncia}
            className="gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
            <Activity className="h-4 w-4" />
            Condição
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Minhas Denúncias Atribuídas
            </CardTitle>
            <CardDescription>
              Denúncias sob sua responsabilidade. Selecione para realizar ações.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Protocolo</TableHead>
                  <TableHead>Vítima</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDenuncias.map((denuncia) => (
                  <TableRow
                    key={denuncia.id}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-muted/50",
                      selectedDenuncia?.id === denuncia.id ? "bg-muted border-l-4 border-l-primary" : ""
                    )}
                    onClick={() => setSelectedDenuncia(denuncia)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{denuncia.protocolo}</span>
                        <Badge
                          variant="outline"
                          className={cn(
                            "w-fit mt-1 text-[10px]",
                            denuncia.prioridade === "critica" && "border-red-500 text-red-500",
                            denuncia.prioridade === "alta" && "border-orange-500 text-orange-500",
                            denuncia.prioridade === "media" && "border-yellow-500 text-yellow-500",
                          )}
                        >
                          {denuncia.prioridade.toUpperCase()}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{denuncia.vitima}</span>
                        <span className="text-xs text-muted-foreground">{denuncia.tipo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="secondary" className="w-fit">
                          {denuncia.status.replace("_", " ")}
                        </Badge>
                        {denuncia.condicao && (
                          <span className="text-xs text-blue-600 font-medium flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            {denuncia.condicao.replace("_", " ")}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        {denuncia.temRelatorio && (
                          <span className="inline-flex" title="Possui Relatório">
                            <FileText className="h-4 w-4 text-blue-500" />
                          </span>
                        )}
                        {denuncia.temEncaminhamento && (
                          <span className="inline-flex" title="Possui Encaminhamento">
                            <Send className="h-4 w-4 text-emerald-500" />
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="h-[600px]">
          <AgendaPessoal />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Denúncia</CardTitle>
          <CardDescription>
            Visualização completa da denúncia selecionada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedDenuncia ? (
            <p className="text-sm text-muted-foreground">
              Selecione uma denúncia na lista ao lado para ver todas as informações.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/40 p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-semibold text-base">
                      {selectedDenuncia.protocolo}
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[11px]",
                        selectedDenuncia.prioridade === "critica" && "border-red-500 text-red-500",
                        selectedDenuncia.prioridade === "alta" && "border-orange-500 text-orange-500",
                        selectedDenuncia.prioridade === "media" && "border-yellow-500 text-yellow-500"
                      )}
                    >
                      {selectedDenuncia.prioridade.toUpperCase()}
                    </Badge>
                    <Badge variant="secondary" className="text-[11px]">
                      {selectedDenuncia.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{selectedDenuncia.data}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-xs md:text-sm md:items-end">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Condição:</span>
                    <span>
                      {selectedDenuncia.condicao
                        ? selectedDenuncia.condicao.replace("_", " ")
                        : "Não definida"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Relatório:</span>
                    <span className="text-muted-foreground">
                      {selectedDenuncia.temRelatorio
                        ? "Possui relatório cadastrado"
                        : "Ainda não possui relatório"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4 text-emerald-600" />
                    <span className="font-medium">Encaminhamento:</span>
                    <span className="text-muted-foreground">
                      {selectedDenuncia.temEncaminhamento
                        ? "Possui encaminhamento cadastrado"
                        : "Ainda não possui encaminhamento"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3 rounded-lg border bg-background p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Dados principais
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="text-[11px] uppercase text-muted-foreground">
                        Vítima
                      </div>
                      <div className="font-medium">{selectedDenuncia.vitima}</div>
                    </div>
                    <div>
                      <div className="text-[11px] uppercase text-muted-foreground">
                        Tipo de denúncia
                      </div>
                      <div>{selectedDenuncia.tipo}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-lg border bg-background p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Local do fato
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-[11px] uppercase text-muted-foreground">
                          Endereço
                        </div>
                        <div>{selectedDenuncia.endereco}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modais */}
      <ModalCondicao
        open={modalCondicaoOpen}
        onOpenChange={setModalCondicaoOpen}
        onConfirm={handleCondicaoConfirm}
      />
      
      <ModalRelatorio
        open={modalRelatorioOpen}
        onOpenChange={setModalRelatorioOpen}
        denunciaProtocolo={selectedDenuncia?.protocolo}
      />
      
      <ModalEncaminhamento
        open={modalEncaminhamentoOpen}
        onOpenChange={setModalEncaminhamentoOpen}
        denunciaProtocolo={selectedDenuncia?.protocolo}
      />

      <ModalAviso
        open={avisoRelatorioOpen}
        onOpenChange={setAvisoRelatorioOpen}
        title="Relatório Existente"
        description="Esta denúncia já possui um relatório cadastrado. Deseja acessar a tela de Relatórios para editá-lo?"
        redirectUrl="/dashboard/operacao/relatorios"
        redirectText="Ir para Relatórios"
      />

      <ModalAviso
        open={avisoEncaminhamentoOpen}
        onOpenChange={setAvisoEncaminhamentoOpen}
        title="Encaminhamento Existente"
        description="Esta denúncia já possui um encaminhamento cadastrado. Deseja acessar a tela de Encaminhamentos para editá-lo?"
        redirectUrl="/dashboard/operacao/encaminhamentos"
        redirectText="Ir para Encaminhamentos"
      />
    </div>
  );
}
