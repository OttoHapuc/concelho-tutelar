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

export default function PageEncaminhamentos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalSelectOpen, setModalSelectOpen] = useState(false);
  const [selectedProtocolo, setSelectedProtocolo] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

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
                <TableHead>Protocolo</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead>Urgência</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEncaminhamentos.map((encaminhamento) => (
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
