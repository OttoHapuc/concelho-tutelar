import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Edit, ExternalLink } from "lucide-react";
import Link from "next/link";

interface ModalAvisoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  redirectUrl: string;
  redirectText: string;
}

export function ModalAviso({
  open,
  onOpenChange,
  title,
  description,
  redirectUrl,
  redirectText,
}: ModalAvisoProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-600 mb-2">
            <AlertCircle className="h-6 w-6" />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="pt-2">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Link href={redirectUrl} passHref>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Edit className="h-4 w-4" />
              {redirectText}
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
