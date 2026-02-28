import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FileText, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ModalRelatorioProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  denunciaId?: string;
  denunciaProtocolo?: string;
  isEdit?: boolean;
}

export function ModalRelatorio({
  open,
  onOpenChange,
  denunciaProtocolo,
  isEdit = false,
}: ModalRelatorioProps) {
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            {isEdit ? "Editar Relatório" : "Novo Relatório"}
          </DialogTitle>
          <DialogDescription>
            {denunciaProtocolo
              ? `Preencha os detalhes do relatório para o protocolo ${denunciaProtocolo}`
              : "Preencha os detalhes do relatório técnico."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data do Relatório</Label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tecnico">Técnico Responsável</Label>
              <Input id="tecnico" placeholder="Seu nome" disabled defaultValue="Operador Atual" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Conteúdo do Relatório</Label>
            <Textarea
              id="content"
              placeholder="Descreva detalhadamente as observações, procedimentos realizados e conclusões..."
              className="min-h-[200px] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onOpenChange(false)} className="bg-blue-600 hover:bg-blue-700">
            {isEdit ? "Salvar Alterações" : "Criar Relatório"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
