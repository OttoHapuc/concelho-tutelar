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

export default function PageRelatorios() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [selectedProtocolo, setSelectedProtocolo] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  const tecnicoAtual = mockRelatorios[0]?.tecnico ?? "";

  const relatoriosFiltrados = mockRelatorios.filter((relatorio) =>
    relatorio.protocolo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const meusRelatorios = relatoriosFiltrados.filter(
    (relatorio) => relatorio.tecnico === tecnicoAtual
  );

  const relatoriosColegas = relatoriosFiltrados.filter(
    (relatorio) => relatorio.tecnico !== tecnicoAtual
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
                <TableHead>Protocolo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Resumo</TableHead>
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
                <TableHead>Protocolo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Resumo</TableHead>
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
