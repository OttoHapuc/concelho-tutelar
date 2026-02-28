"use client";

import React, { useState } from "react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Eye,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
  ArrowLeft,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

function ColumnHeader({
  title,
  sortDirection,
  onSort,
  isFiltered,
  onFilter,
  options,
  type = "text",
}: {
  title: string;
  sortDirection: "asc" | "desc" | null;
  onSort: () => void;
  isFiltered: boolean;
  onFilter: (value: string | null) => void;
  options?: { label: string; value: string }[];
  type?: "text" | "select";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState("");

  const handleApply = () => {
    onFilter(tempValue || null);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempValue("");
    onFilter(null);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center space-x-1">
      <span className="text-sm font-semibold">{title}</span>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-red-800 hover:text-white group"
          onClick={onSort}
        >
          {sortDirection === "desc" ? (
            <ArrowDown className="h-3 w-3 group-hover:text-white" />
          ) : sortDirection === "asc" ? (
            <ArrowUp className="h-3 w-3 group-hover:text-white" />
          ) : (
            <ArrowUpDown className="h-3 w-3 text-muted-foreground/50 group-hover:text-white" />
          )}
        </Button>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-6 w-6", isFiltered && "text-primary")}
            >
              <Filter className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="start">
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">
                Filtrar por {title}
              </h4>
              <div className="space-y-2">
                <Select defaultValue="contains">
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Operador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contains">Contém</SelectItem>
                    <SelectItem value="equals">Igual</SelectItem>
                  </SelectContent>
                </Select>

                {type === "select" && options ? (
                  <Select value={tempValue} onValueChange={setTempValue}>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Selecione uma opção..." />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="h-8"
                    placeholder="Digite o valor..."
                  />
                )}
              </div>
              <div className="flex justify-between pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Limpar
                </Button>
                <Button
                  size="sm"
                  onClick={handleApply}
                  className="h-7 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Aplicar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
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

const statusOptions = Object.keys(statusConfig).map((key) => ({
  label: statusConfig[key as StatusAcao].label,
  value: key,
}));

const prioridadeOptions = [
  { label: "Baixa", value: "baixa" },
  { label: "Média", value: "media" },
  { label: "Alta", value: "alta" },
  { label: "Urgente", value: "urgente" },
];

export function PainelAcoes() {
  const [tab, setTab] = useState("todas");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Acao;
    direction: "asc" | "desc";
  } | null>(null);
  const [filters, setFilters] = useState<Partial<Record<keyof Acao, string>>>(
    {}
  );

  const handleSort = (key: keyof Acao) => {
    setSortConfig((current) => {
      if (current?.key === key && current.direction === "asc") {
        return { key, direction: "desc" };
      }
      if (current?.key === key && current.direction === "desc") {
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  const handleFilter = (key: keyof Acao, value: string | null) => {
    setFilters((current) => {
      const newFilters = { ...current };
      if (value === null || value === "") {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
  };

  const contarPorStatus = (status: StatusAcao | "andamento" | "concluidas") => {
    if (status === "andamento")
      return acoes.filter((a) => a.status !== "concluida").length;
    if (status === "concluidas")
      return acoes.filter((a) => a.status === "concluida").length;
    return acoes.filter((a) => a.status === status).length;
  };

  const getFilteredAndSortedAcoes = () => {
    let result = [...acoes];

    // Filtro por Tab
    if (tab === "andamento") {
      result = result.filter((a) => a.status !== "concluida");
    } else if (tab === "concluidas") {
      result = result.filter((a) => a.status === "concluida");
    }

    // Filtros customizados
    Object.keys(filters).forEach((key) => {
      const filterKey = key as keyof Acao;
      const filterValue = filters[filterKey];
      if (filterValue) {
        result = result.filter((a) => {
          const itemValue = String(a[filterKey]).toLowerCase();
          return itemValue.includes(filterValue.toLowerCase());
        });
      }
    });

    // Ordenação
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  };

  const filteredAcoes = getFilteredAndSortedAcoes();

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
          <TabsList className="mb-4 w-full justify-start overflow-x-auto bg-transparent p-0 gap-2 h-auto">
            <TabsTrigger
              value="todas"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white border bg-white shadow-sm hover:bg-gray-50 h-9 px-4 rounded-md"
            >
              Todas ({acoes.length})
            </TabsTrigger>
            <TabsTrigger
              value="andamento"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white border bg-white shadow-sm hover:bg-gray-50 h-9 px-4 rounded-md"
            >
              Em Andamento ({contarPorStatus("andamento")})
            </TabsTrigger>
            <TabsTrigger
              value="concluidas"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white border bg-white shadow-sm hover:bg-gray-50 h-9 px-4 rounded-md"
            >
              Concluídas ({contarPorStatus("concluidas")})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={tab} className="mt-0">
            <div className="overflow-x-auto rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>
                      <ColumnHeader
                        title="Protocolo"
                        sortDirection={
                          sortConfig?.key === "protocolo"
                            ? sortConfig.direction
                            : null
                        }
                        onSort={() => handleSort("protocolo")}
                        isFiltered={!!filters.protocolo}
                        onFilter={(v) => handleFilter("protocolo", v)}
                      />
                    </TableHead>
                    <TableHead>
                      <ColumnHeader
                        title="Tipo"
                        sortDirection={
                          sortConfig?.key === "tipo" ? sortConfig.direction : null
                        }
                        onSort={() => handleSort("tipo")}
                        isFiltered={!!filters.tipo}
                        onFilter={(v) => handleFilter("tipo", v)}
                      />
                    </TableHead>
                    <TableHead>
                      <ColumnHeader
                        title="Vítima"
                        sortDirection={
                          sortConfig?.key === "vitima"
                            ? sortConfig.direction
                            : null
                        }
                        onSort={() => handleSort("vitima")}
                        isFiltered={!!filters.vitima}
                        onFilter={(v) => handleFilter("vitima", v)}
                      />
                    </TableHead>
                    <TableHead>
                      <ColumnHeader
                        title="Local"
                        sortDirection={
                          sortConfig?.key === "bairro"
                            ? sortConfig.direction
                            : null
                        }
                        onSort={() => handleSort("bairro")}
                        isFiltered={!!filters.bairro}
                        onFilter={(v) => handleFilter("bairro", v)}
                      />
                    </TableHead>
                    <TableHead>
                      <ColumnHeader
                        title="Responsável"
                        sortDirection={
                          sortConfig?.key === "responsavel"
                            ? sortConfig.direction
                            : null
                        }
                        onSort={() => handleSort("responsavel")}
                        isFiltered={!!filters.responsavel}
                        onFilter={(v) => handleFilter("responsavel", v)}
                      />
                    </TableHead>
                    <TableHead>
                      <ColumnHeader
                        title="Status"
                        sortDirection={
                          sortConfig?.key === "status"
                            ? sortConfig.direction
                            : null
                        }
                        onSort={() => handleSort("status")}
                        isFiltered={!!filters.status}
                        onFilter={(v) => handleFilter("status", v)}
                        options={statusOptions}
                        type="select"
                      />
                    </TableHead>
                    <TableHead>
                      <ColumnHeader
                        title="Prioridade"
                        sortDirection={
                          sortConfig?.key === "prioridade"
                            ? sortConfig.direction
                            : null
                        }
                        onSort={() => handleSort("prioridade")}
                        isFiltered={!!filters.prioridade}
                        onFilter={(v) => handleFilter("prioridade", v)}
                        options={prioridadeOptions}
                        type="select"
                      />
                    </TableHead>
                    <TableHead>
                      <ColumnHeader
                        title="Atualização"
                        sortDirection={
                          sortConfig?.key === "ultimaAtualizacao"
                            ? sortConfig.direction
                            : null
                        }
                        onSort={() => handleSort("ultimaAtualizacao")}
                        isFiltered={!!filters.ultimaAtualizacao}
                        onFilter={(v) => handleFilter("ultimaAtualizacao", v)}
                      />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAcoes.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="h-24 text-center text-muted-foreground"
                      >
                        Nenhum resultado encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAcoes.map((acao) => (
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
