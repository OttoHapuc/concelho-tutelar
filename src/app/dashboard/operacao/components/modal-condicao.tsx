import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { AlertTriangle, Stethoscope, FileText, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalCondicaoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (condicao: string) => void;
}

const condicoes = [
  {
    id: "iniciada",
    label: "Iniciada",
    description: "Atendimento iniciado, em processo de avaliação inicial.",
    icon: Activity,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    id: "requer_iml",
    label: "Requer IML",
    description: "Necessário encaminhamento para exame de corpo de delito.",
    icon: AlertTriangle,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    id: "acompanhamento_medico",
    label: "Acomp. Médico",
    description: "Necessita de avaliação ou acompanhamento médico.",
    icon: Stethoscope,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    id: "bo",
    label: "Boletim de Ocorrência",
    description: "Necessário registrar B.O. junto às autoridades policiais.",
    icon: FileText,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
];

export function ModalCondicao({ open, onOpenChange, onConfirm }: ModalCondicaoProps) {
  const [selected, setSelected] = useState<string>("");

  const handleConfirm = () => {
    if (selected) {
      onConfirm(selected);
      onOpenChange(false);
      setSelected("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Definir Condição da Denúncia</DialogTitle>
          <DialogDescription>
            Selecione a condição atual ou o próximo passo necessário para este atendimento.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={selected} onValueChange={setSelected} className="grid gap-3">
            {condicoes.map((item) => {
              const Icon = item.icon;
              const isSelected = selected === item.id;
              return (
                <div key={item.id}>
                  <RadioGroupItem
                    value={item.id}
                    id={item.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={item.id}
                    className={cn(
                      "group flex items-start gap-3 rounded-lg border p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                      isSelected ? `ring-2 ring-primary border-transparent ${item.bg}` : "bg-card"
                    )}
                  >
                    <div className={cn("mt-0.5 rounded-full p-1", item.bg)}>
                      <Icon className={cn("h-4 w-4", item.color)} />
                    </div>
                    <div className="space-y-1">
                      <div
                        className={cn(
                          "font-medium leading-none group-hover:text-white",
                          isSelected && "text-white"
                        )}
                      >
                        {item.label}
                      </div>
                      <p
                        className={cn(
                          "text-xs font-normal group-hover:text-white/90",
                          isSelected ? "text-white/90" : "text-muted-foreground"
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!selected}>
            Confirmar Condição
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
