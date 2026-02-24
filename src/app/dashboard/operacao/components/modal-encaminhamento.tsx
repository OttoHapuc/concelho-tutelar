import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Send, MapPin, Building, AlertCircle } from "lucide-react";

interface ModalEncaminhamentoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  denunciaProtocolo?: string;
  isEdit?: boolean;
}

export function ModalEncaminhamento({
  open,
  onOpenChange,
  denunciaProtocolo,
  isEdit = false,
}: ModalEncaminhamentoProps) {
  const [destino, setDestino] = useState("");
  const [urgencia, setUrgencia] = useState("media");
  const [motivo, setMotivo] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-emerald-600" />
            {isEdit ? "Editar Encaminhamento" : "Novo Encaminhamento"}
          </DialogTitle>
          <DialogDescription>
            {denunciaProtocolo
              ? `Encaminhar caso ${denunciaProtocolo} para órgão externo.`
              : "Selecione o destino e motivo do encaminhamento."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="destino">Órgão de Destino</Label>
            <Select value={destino} onValueChange={setDestino}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o órgão..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cras">CRAS - Centro de Referência de Assistência Social</SelectItem>
                <SelectItem value="creas">CREAS - Centro de Referência Especializado</SelectItem>
                <SelectItem value="caps">CAPS - Centro de Atenção Psicossocial</SelectItem>
                <SelectItem value="mp">Ministério Público</SelectItem>
                <SelectItem value="delegacia">Delegacia de Polícia</SelectItem>
                <SelectItem value="saude">Unidade Básica de Saúde</SelectItem>
                <SelectItem value="escola">Rede Escolar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgencia">Nível de Urgência</Label>
            <div className="flex gap-2">
              <Button
                variant={urgencia === "baixa" ? "default" : "outline"}
                size="sm"
                onClick={() => setUrgencia("baixa")}
                className={urgencia === "baixa" ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                Baixa
              </Button>
              <Button
                variant={urgencia === "media" ? "default" : "outline"}
                size="sm"
                onClick={() => setUrgencia("media")}
                className={urgencia === "media" ? "bg-amber-500 hover:bg-amber-600" : ""}
              >
                Média
              </Button>
              <Button
                variant={urgencia === "alta" ? "default" : "outline"}
                size="sm"
                onClick={() => setUrgencia("alta")}
                className={urgencia === "alta" ? "bg-red-500 hover:bg-red-600" : ""}
              >
                Alta
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo do Encaminhamento</Label>
            <Textarea
              id="motivo"
              placeholder="Justificativa técnica para o encaminhamento..."
              className="min-h-[100px]"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={() => onOpenChange(false)} className="bg-emerald-600 hover:bg-emerald-700">
            {isEdit ? "Atualizar Encaminhamento" : "Confirmar Encaminhamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
