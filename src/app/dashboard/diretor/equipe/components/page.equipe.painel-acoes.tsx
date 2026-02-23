"use client";

import React from "react"

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Eye,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
  ArrowLeft,
} from "lucide-react";

type StatusAcao =
  | "reconhecimento"
  | "acompanhamento_rotina"
  | "acompanhamento_iml"
  | "acompanhamento_critico"
  | "em_retorno"
  | "concluida";

interface Acao {
  id: string;
  protocolo: string;
  tipo: string;
  vitima: string;
  idade: number;
  bairro: string;
  responsavel: string;
  status: StatusAcao;
  dataInicio: string;
  ultimaAtualizacao: string;
  prioridade: "baixa" | "media" | "alta" | "urgente";
}

const acoes: Acao[] = [
  {
    id: "1",
    protocolo: "CT-2024-001247",
    tipo: "Negligência",
    vitima: "M.S.O.",
    idade: 8,
    bairro: "Zona Norte",
    responsavel: "Carlos Eduardo",
    status: "reconhecimento",
    dataInicio: "18/01/2024",
    ultimaAtualizacao: "18/01/2024 09:30",
    prioridade: "alta",
  },
  {
    id: "2",
    protocolo: "CT-2024-001245",
    tipo: "Violência Física",
    vitima: "J.P.L.",
    idade: 12,
    bairro: "Centro",
    responsavel: "Ana Paula",
    status: "acompanhamento_critico",
    dataInicio: "17/01/2024",
    ultimaAtualizacao: "18/01/2024 08:15",
    prioridade: "urgente",
  },
  {
    id: "3",
    protocolo: "CT-2024-001240",
    tipo: "Abandono",
    vitima: "L.F.S.",
    idade: 5,
    bairro: "Zona Leste",
    responsavel: "Roberto Santos",
    status: "acompanhamento_iml",
    dataInicio: "16/01/2024",
    ultimaAtualizacao: "18/01/2024 07:45",
    prioridade: "urgente",
  },
  {
    id: "4",
    protocolo: "CT-2024-001238",
    tipo: "Negligência",
    vitima: "A.B.C.",
    idade: 10,
    bairro: "Zona Sul",
    responsavel: "Fernando Lima",
    status: "acompanhamento_rotina",
    dataInicio: "15/01/2024",
    ultimaAtualizacao: "17/01/2024 16:00",
    prioridade: "media",
  },
  {
    id: "5",
    protocolo: "CT-2024-001235",
    tipo: "Violência Psicológica",
    vitima: "R.T.M.",
    idade: 14,
    bairro: "Zona Oeste",
    responsavel: "Carlos Eduardo",
    status: "em_retorno",
    dataInicio: "14/01/2024",
    ultimaAtualizacao: "18/01/2024 10:30",
    prioridade: "media",
  },
  {
    id: "6",
    protocolo: "CT-2024-001230",
    tipo: "Negligência",
    vitima: "P.H.S.",
    idade: 7,
    bairro: "Centro",
    responsavel: "Mariana Costa",
    status: "concluida",
    dataInicio: "12/01/2024",
    ultimaAtualizacao: "17/01/2024 18:00",
    prioridade: "baixa",
  },
  {
    id: "7",
    protocolo: "CT-2024-001228",
    tipo: "Violência Física",
    vitima: "G.M.R.",
    idade: 9,
    bairro: "Zona Norte",
    responsavel: "Ana Paula",
    status: "concluida",
    dataInicio: "11/01/2024",
    ultimaAtualizacao: "16/01/2024 14:30",
    prioridade: "alta",
  },
];

const statusConfig: Record<
  StatusAcao,
  { label: string; color: string; icon: React.ReactNode }
> = {
  reconhecimento: {
    label: "Reconhecimento",
    color: "bg-blue-100 text-blue-800 border-blue-300",
    icon: <Search className="h-3 w-3" />,
  },
  acompanhamento_rotina: {
    label: "Acomp. Rotina",
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    icon: <Eye className="h-3 w-3" />,
  },
  acompanhamento_iml: {
    label: "Acomp. IML",
    color: "bg-purple-100 text-purple-800 border-purple-300",
    icon: <Activity className="h-3 w-3" />,
  },
  acompanhamento_critico: {
    label: "Acomp. Crítico",
    color: "bg-red-100 text-red-800 border-red-300",
    icon: <AlertTriangle className="h-3 w-3" />,
  },
  em_retorno: {
    label: "Em Retorno",
    color: "bg-amber-100 text-amber-800 border-amber-300",
    icon: <ArrowLeft className="h-3 w-3" />,
  },
  concluida: {
    label: "Concluída",
    color: "bg-gray-100 text-gray-800 border-gray-300",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
};

const prioridadeConfig = {
  baixa: "bg-gray-100 text-gray-700",
  media: "bg-blue-100 text-blue-700",
  alta: "bg-orange-100 text-orange-700",
  urgente: "bg-red-100 text-red-700",
};

export function PainelAcoes() {
  const [tab, setTab] = useState("todas");

  const filtrarAcoes = (status: string) => {
    if (status === "todas") return acoes;
    if (status === "andamento")
      return acoes.filter((a) => a.status !== "concluida");
    if (status === "concluidas")
      return acoes.filter((a) => a.status === "concluida");
    return acoes.filter((a) => a.status === status);
  };

  const contarPorStatus = (status: StatusAcao | "andamento" | "concluidas") => {
    if (status === "andamento")
      return acoes.filter((a) => a.status !== "concluida").length;
    if (status === "concluidas")
      return acoes.filter((a) => a.status === "concluida").length;
    return acoes.filter((a) => a.status === status).length;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Painel de Ações e Atendimentos</CardTitle>
        <CardDescription>
          Acompanhamento detalhado de todas as ações em andamento e concluídas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Cards de Resumo */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center">
            <Search className="mx-auto mb-1 h-5 w-5 text-blue-600" />
            <p className="text-2xl font-bold text-blue-700">
              {contarPorStatus("reconhecimento")}
            </p>
            <p className="text-xs text-blue-600">Reconhecimento</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
            <Eye className="mx-auto mb-1 h-5 w-5 text-emerald-600" />
            <p className="text-2xl font-bold text-emerald-700">
              {contarPorStatus("acompanhamento_rotina")}
            </p>
            <p className="text-xs text-emerald-600">Acomp. Rotina</p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 text-center">
            <Activity className="mx-auto mb-1 h-5 w-5 text-purple-600" />
            <p className="text-2xl font-bold text-purple-700">
              {contarPorStatus("acompanhamento_iml")}
            </p>
            <p className="text-xs text-purple-600">Acomp. IML</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center">
            <AlertTriangle className="mx-auto mb-1 h-5 w-5 text-red-600" />
            <p className="text-2xl font-bold text-red-700">
              {contarPorStatus("acompanhamento_critico")}
            </p>
            <p className="text-xs text-red-600">Acomp. Crítico</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center">
            <ArrowLeft className="mx-auto mb-1 h-5 w-5 text-amber-600" />
            <p className="text-2xl font-bold text-amber-700">
              {contarPorStatus("em_retorno")}
            </p>
            <p className="text-xs text-amber-600">Em Retorno</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
            <CheckCircle2 className="mx-auto mb-1 h-5 w-5 text-gray-600" />
            <p className="text-2xl font-bold text-gray-700">
              {contarPorStatus("concluidas")}
            </p>
            <p className="text-xs text-gray-600">Concluídas</p>
          </div>
        </div>

        {/* Tabs e Tabela */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-4 w-full justify-start overflow-x-auto">
            <TabsTrigger value="todas">
              Todas ({acoes.length})
            </TabsTrigger>
            <TabsTrigger value="andamento">
              Em Andamento ({contarPorStatus("andamento")})
            </TabsTrigger>
            <TabsTrigger value="concluidas">
              Concluídas ({contarPorStatus("concluidas")})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-0">
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Protocolo</TableHead>
                    <TableHead className="font-semibold">Tipo</TableHead>
                    <TableHead className="font-semibold">Vítima</TableHead>
                    <TableHead className="font-semibold">Local</TableHead>
                    <TableHead className="font-semibold">Responsável</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Prioridade</TableHead>
                    <TableHead className="font-semibold">Atualização</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrarAcoes(tab).map((acao) => (
                    <TableRow key={acao.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-sm font-medium">
                        {acao.protocolo}
                      </TableCell>
                      <TableCell>{acao.tipo}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{acao.vitima}</p>
                          <p className="text-xs text-muted-foreground">
                            {acao.idade} anos
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{acao.bairro}</TableCell>
                      <TableCell>{acao.responsavel}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`gap-1 ${statusConfig[acao.status].color}`}
                        >
                          {statusConfig[acao.status].icon}
                          {statusConfig[acao.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={prioridadeConfig[acao.prioridade]}
                        >
                          {acao.prioridade.charAt(0).toUpperCase() +
                            acao.prioridade.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {acao.ultimaAtualizacao}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
