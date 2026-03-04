"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Building,
} from "lucide-react";
import { ModalEncaminhamento } from "../components/modal-encaminhamento";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowDown, ArrowUp, ArrowUpDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
interface Encaminhamento {
  id: string;
  protocolo: string;
  destino: string;
  motivo: string;
  urgencia: "baixa" | "media" | "alta";
  status: "pendente" | "aceito" | "rejeitado";
}

const mockEncaminhamentos: Encaminhamento[] = [
  {
    id: "1",
    protocolo: "CT-2024-001555",
    destino: "CRAS - Centro de Referência",
    motivo: "Família em situação de vulnerabilidade extrema.",
    urgencia: "alta",
    status: "pendente",
  },
];

// Mock de Denúncias que JÁ TEM relatório mas NÃO TEM encaminhamento
const mockDenunciasAptas = [
  { id: "2", protocolo: "CT-2024-001550", vitima: "Julia Costa" },
];

type EncaminhamentoSortKey = "protocolo" | "destino" | "urgencia" | "motivo";

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

export default function PageEncaminhamentos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [selectedProtocolo, setSelectedProtocolo] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [sortConfig, setSortConfig] = useState<{
    key: EncaminhamentoSortKey;
    direction: "asc" | "desc";
  } | null>(null);
  const [filters, setFilters] = useState<
    Partial<Record<EncaminhamentoSortKey, string>>
  >({});

  const handleCreateClick = () => {
    setIsEditMode(false);
    setSelectedProtocolo("");
    setModalSelectOpen(true);
  };

  const handleSelectConfirm = () => {
    if (selectedProtocolo) {
      setModalSelectOpen(false);
      setModalCreateOpen(true);
    }
  };

  const handleEditClick = (encaminhamento: Encaminhamento) => {
    setIsEditMode(true);
    setSelectedProtocolo(encaminhamento.protocolo);
    setModalCreateOpen(true);
  };

  const handleSort = (key: EncaminhamentoSortKey) => {
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

  const handleFilter = (key: EncaminhamentoSortKey, value: string | null) => {
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

  const urgenciaOptions = [
    { label: "Baixa", value: "baixa" },
    { label: "Média", value: "media" },
    { label: "Alta", value: "alta" },
  ];

  const getFilteredAndSortedEncaminhamentos = () => {
    let result = mockEncaminhamentos.filter((encaminhamento) =>
      encaminhamento.destino.toLowerCase().includes(searchTerm.toLowerCase())
    );

    Object.keys(filters).forEach((key) => {
      const filterKey = key as EncaminhamentoSortKey;
      const filterValue = filters[filterKey];
      if (filterValue) {
        result = result.filter((encaminhamento) => {
          const itemValue = String(encaminhamento[filterKey]).toLowerCase();
          return itemValue.includes(filterValue.toLowerCase());
        });
      }
    });

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = String(a[sortConfig.key]).toLowerCase();
        const bValue = String(b[sortConfig.key]).toLowerCase();
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  };

  const encaminhamentosFiltrados = getFilteredAndSortedEncaminhamentos();

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Encaminhamentos</h1>
          <p className="text-muted-foreground">
            Gestão de encaminhamentos para a rede de proteção.
          </p>
        </div>
        <Button onClick={handleCreateClick} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4" />
          Novo Encaminhamento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>Histórico de Encaminhamentos</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por destino..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-[640px] sm:min-w-0">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <ColumnHeader
                    title="Protocolo"
                    sortDirection={
                      sortConfig?.key === "protocolo" ? sortConfig.direction : null
                    }
                    onSort={() => handleSort("protocolo")}
                    isFiltered={!!filters.protocolo}
                    onFilter={(v) => handleFilter("protocolo", v)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    title="Destino"
                    sortDirection={
                      sortConfig?.key === "destino" ? sortConfig.direction : null
                    }
                    onSort={() => handleSort("destino")}
                    isFiltered={!!filters.destino}
                    onFilter={(v) => handleFilter("destino", v)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    title="Urgência"
                    sortDirection={
                      sortConfig?.key === "urgencia" ? sortConfig.direction : null
                    }
                    onSort={() => handleSort("urgencia")}
                    isFiltered={!!filters.urgencia}
                    onFilter={(v) => handleFilter("urgencia", v)}
                    options={urgenciaOptions}
                    type="select"
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    title="Motivo"
                    sortDirection={
                      sortConfig?.key === "motivo" ? sortConfig.direction : null
                    }
                    onSort={() => handleSort("motivo")}
                    isFiltered={!!filters.motivo}
                    onFilter={(v) => handleFilter("motivo", v)}
                  />
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {encaminhamentosFiltrados.map((encaminhamento) => (
                <TableRow key={encaminhamento.id}>
                  <TableCell className="font-medium">{encaminhamento.protocolo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {encaminhamento.destino}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        encaminhamento.urgencia === "alta"
                          ? "border-red-500 text-red-500"
                          : encaminhamento.urgencia === "media"
                          ? "border-amber-500 text-amber-500"
                          : "border-blue-500 text-blue-500"
                      }
                    >
                      {encaminhamento.urgencia.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {encaminhamento.motivo}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(encaminhamento)}
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Seleção de Denúncia (Apenas com Relatório) */}
      <Dialog open={modalSelectOpen} onOpenChange={setModalSelectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar Denúncia</DialogTitle>
            <DialogDescription>
              Selecione uma denúncia (com relatório emitido) para criar um encaminhamento.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedProtocolo} onValueChange={setSelectedProtocolo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o protocolo..." />
              </SelectTrigger>
              <SelectContent>
                {mockDenunciasAptas.map((denuncia) => (
                  <SelectItem key={denuncia.id} value={denuncia.protocolo}>
                    {denuncia.protocolo} - {denuncia.vitima}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalSelectOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSelectConfirm} disabled={!selectedProtocolo}>
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Criação/Edição de Encaminhamento */}
      <ModalEncaminhamento
        open={modalCreateOpen}
        onOpenChange={setModalCreateOpen}
        denunciaProtocolo={selectedProtocolo}
        isEdit={isEditMode}
      />
    </div>
  );
}
