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
  Calendar,
  Edit,
  Trash2,
} from "lucide-react";
import { ModalRelatorio } from "../components/modal-relatorio";
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
interface Relatorio {
  id: string;
  protocolo: string;
  data: string;
  tecnico: string;
  resumo: string;
}

const mockRelatorios: Relatorio[] = [
  {
    id: "1",
    protocolo: "CT-2024-001550",
    data: "24/02/2026",
    tecnico: "Maria Conselheira",
    resumo: "Relatório de visita domiciliar inicial. Constatado abandono...",
  },
  {
    id: "2",
    protocolo: "CT-2024-001555",
    data: "23/02/2026",
    tecnico: "João Conselheiro",
    resumo: "Acompanhamento escolar realizado. Situação regularizada.",
  },
];

// Mock de Denúncias sem relatório para o modal de seleção
const mockDenunciasSemRelatorio = [
  { id: "1", protocolo: "CT-2024-001547", vitima: "Maria Silva" },
  { id: "4", protocolo: "CT-2024-001560", vitima: "Pedro Santos" },
];

type RelatorioSortKey = "protocolo" | "data" | "tecnico" | "resumo";

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

export default function PageRelatorios() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [selectedProtocolo, setSelectedProtocolo] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const [sortMeus, setSortMeus] = useState<{
    key: RelatorioSortKey;
    direction: "asc" | "desc";
  } | null>(null);
  const [filtersMeus, setFiltersMeus] = useState<
    Partial<Record<RelatorioSortKey, string>>
  >({});

  const [sortColegas, setSortColegas] = useState<{
    key: RelatorioSortKey;
    direction: "asc" | "desc";
  } | null>(null);
  const [filtersColegas, setFiltersColegas] = useState<
    Partial<Record<RelatorioSortKey, string>>
  >({});

  const tecnicoAtual = mockRelatorios[0]?.tecnico ?? "";

  const handleSortMeus = (key: RelatorioSortKey) => {
    setSortMeus((current) => {
      if (current?.key === key && current.direction === "asc") {
        return { key, direction: "desc" };
      }
      if (current?.key === key && current.direction === "desc") {
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  const handleSortColegas = (key: RelatorioSortKey) => {
    setSortColegas((current) => {
      if (current?.key === key && current.direction === "asc") {
        return { key, direction: "desc" };
      }
      if (current?.key === key && current.direction === "desc") {
        return null;
      }
      return { key, direction: "asc" };
    });
  };

  const handleFilterMeus = (key: RelatorioSortKey, value: string | null) => {
    setFiltersMeus((current) => {
      const newFilters = { ...current };
      if (value === null || value === "") {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
  };

  const handleFilterColegas = (key: RelatorioSortKey, value: string | null) => {
    setFiltersColegas((current) => {
      const newFilters = { ...current };
      if (value === null || value === "") {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
  };

  const getFilteredAndSortedRelatorios = (
    base: Relatorio[],
    sortConfig: { key: RelatorioSortKey; direction: "asc" | "desc" } | null,
    filters: Partial<Record<RelatorioSortKey, string>>
  ) => {
    let result = base.filter((relatorio) =>
      relatorio.protocolo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    Object.keys(filters).forEach((key) => {
      const filterKey = key as RelatorioSortKey;
      const filterValue = filters[filterKey];
      if (filterValue) {
        result = result.filter((relatorio) => {
          const itemValue = String(relatorio[filterKey]).toLowerCase();
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

  const meusRelatorios = getFilteredAndSortedRelatorios(
    mockRelatorios.filter((relatorio) => relatorio.tecnico === tecnicoAtual),
    sortMeus,
    filtersMeus
  );

  const relatoriosColegas = getFilteredAndSortedRelatorios(
    mockRelatorios.filter((relatorio) => relatorio.tecnico !== tecnicoAtual),
    sortColegas,
    filtersColegas
  );

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

  const handleEditClick = (relatorio: Relatorio) => {
    setIsEditMode(true);
    setSelectedProtocolo(relatorio.protocolo);
    setModalCreateOpen(true);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios Técnicos</h1>
          <p className="text-muted-foreground">
            Gerenciamento e emissão de relatórios de acompanhamento.
          </p>
        </div>
        <Button onClick={handleCreateClick} className="gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>Meus Relatórios</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por protocolo..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CardDescription className="mt-2">
            Relatórios emitidos por você.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-[640px] sm:min-w-0">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <ColumnHeader
                    title="Protocolo"
                    sortDirection={
                      sortMeus?.key === "protocolo" ? sortMeus.direction : null
                    }
                    onSort={() => handleSortMeus("protocolo")}
                    isFiltered={!!filtersMeus.protocolo}
                    onFilter={(v) => handleFilterMeus("protocolo", v)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    title="Data"
                    sortDirection={
                      sortMeus?.key === "data" ? sortMeus.direction : null
                    }
                    onSort={() => handleSortMeus("data")}
                    isFiltered={!!filtersMeus.data}
                    onFilter={(v) => handleFilterMeus("data", v)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    title="Técnico"
                    sortDirection={
                      sortMeus?.key === "tecnico" ? sortMeus.direction : null
                    }
                    onSort={() => handleSortMeus("tecnico")}
                    isFiltered={!!filtersMeus.tecnico}
                    onFilter={(v) => handleFilterMeus("tecnico", v)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    title="Resumo"
                    sortDirection={
                      sortMeus?.key === "resumo" ? sortMeus.direction : null
                    }
                    onSort={() => handleSortMeus("resumo")}
                    isFiltered={!!filtersMeus.resumo}
                    onFilter={(v) => handleFilterMeus("resumo", v)}
                  />
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meusRelatorios.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-6 text-center text-sm text-muted-foreground"
                  >
                    Nenhum relatório encontrado para o operador.
                  </TableCell>
                </TableRow>
              ) : (
                meusRelatorios.map((relatorio) => (
                  <TableRow key={relatorio.id}>
                    <TableCell className="font-medium">
                      {relatorio.protocolo}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {relatorio.data}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{relatorio.tecnico}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {relatorio.resumo}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(relatorio)}
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
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios dos Colegas</CardTitle>
          <CardDescription>
            Visão dos relatórios emitidos pelos demais conselheiros(as).
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-[640px] sm:min-w-0">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <ColumnHeader
                    title="Protocolo"
                    sortDirection={
                      sortColegas?.key === "protocolo" ? sortColegas.direction : null
                    }
                    onSort={() => handleSortColegas("protocolo")}
                    isFiltered={!!filtersColegas.protocolo}
                    onFilter={(v) => handleFilterColegas("protocolo", v)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    title="Data"
                    sortDirection={
                      sortColegas?.key === "data" ? sortColegas.direction : null
                    }
                    onSort={() => handleSortColegas("data")}
                    isFiltered={!!filtersColegas.data}
                    onFilter={(v) => handleFilterColegas("data", v)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    title="Técnico"
                    sortDirection={
                      sortColegas?.key === "tecnico" ? sortColegas.direction : null
                    }
                    onSort={() => handleSortColegas("tecnico")}
                    isFiltered={!!filtersColegas.tecnico}
                    onFilter={(v) => handleFilterColegas("tecnico", v)}
                  />
                </TableHead>
                <TableHead>
                  <ColumnHeader
                    title="Resumo"
                    sortDirection={
                      sortColegas?.key === "resumo" ? sortColegas.direction : null
                    }
                    onSort={() => handleSortColegas("resumo")}
                    isFiltered={!!filtersColegas.resumo}
                    onFilter={(v) => handleFilterColegas("resumo", v)}
                  />
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relatoriosColegas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-6 text-center text-sm text-muted-foreground"
                  >
                    Nenhum relatório encontrado dos colegas.
                  </TableCell>
                </TableRow>
              ) : (
                relatoriosColegas.map((relatorio) => (
                  <TableRow key={relatorio.id}>
                    <TableCell className="font-medium">
                      {relatorio.protocolo}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {relatorio.data}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{relatorio.tecnico}</Badge>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {relatorio.resumo}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditClick(relatorio)}
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
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal de Seleção de Denúncia */}
      <Dialog open={modalSelectOpen} onOpenChange={setModalSelectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecionar Denúncia</DialogTitle>
            <DialogDescription>
              Selecione uma denúncia pendente para criar um novo relatório.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedProtocolo} onValueChange={setSelectedProtocolo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o protocolo..." />
              </SelectTrigger>
              <SelectContent>
                {mockDenunciasSemRelatorio.map((denuncia) => (
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

      {/* Modal de Criação/Edição de Relatório */}
      <ModalRelatorio
        open={modalCreateOpen}
        onOpenChange={setModalCreateOpen}
        denunciaProtocolo={selectedProtocolo}
        isEdit={isEditMode}
      />
    </div>
  );
}
