"use client";

import { useState } from "react";
import {
  ListagemDenuncias,
  type Denuncia,
} from "./components/page.triagem.listagem-denuncias";
import { CasosRelacionados } from "./components/page.triagem.casos-relacionados";
import { QuadroAtendimento } from "./components/page.triagem.quadro-atendimento";
import { ModalDirecionar } from "./components/page.triagem.modal-direcionar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ClipboardList,
  Calendar,
  Send,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function TriagemPage() {
  const [denunciaSelecionada, setDenunciaSelecionada] = useState<Denuncia | null>(
    null
  );
  const [modalDirecionarOpen, setModalDirecionarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("triagem");

  const handleDirecionar = (dados: {
    operacionalId: string;
    tipoAtendimento: string;
    observacoes: string;
    dataAgendada: string;
    horarioAgendado: string;
  }) => {
    console.log("Direcionado:", { denuncia: denunciaSelecionada, ...dados });
    setDenunciaSelecionada(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]  lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/diretor">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Triagem e Direcionamento
            </h1>
            <p className="text-muted-foreground">
              Analise denúncias, verifique casos relacionados e direcione para
              atendimento
            </p>
          </div>
        </div>
        {denunciaSelecionada && (
          <Button onClick={() => setModalDirecionarOpen(true)}>
            <Send className="h-4 w-4 mr-2" />
            Direcionar para Atendimento
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="w-fit mb-4">
          <TabsTrigger value="triagem" className="gap-2">
            <ClipboardList className="h-4 w-4" />
            Triagem de Denúncias
          </TabsTrigger>
          <TabsTrigger value="quadro" className="gap-2">
            <Calendar className="h-4 w-4" />
            Quadro de Atendimento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="triagem" className="flex-1 mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Listagem de Denúncias */}
            <div className="h-[calc(100vh-220px)]">
              <ListagemDenuncias
                onSelectDenuncia={setDenunciaSelecionada}
                selectedId={denunciaSelecionada?.id}
              />
            </div>

            {/* Casos Relacionados */}
            <div className="h-[calc(100vh-220px)]">
              <CasosRelacionados denuncia={denunciaSelecionada} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quadro" className="flex-1 mt-0">
          <div className="h-[calc(100vh-220px)]">
            <QuadroAtendimento
              onAgendar={() => {
                if (denunciaSelecionada) {
                  setModalDirecionarOpen(true);
                }
              }}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Direcionamento */}
      <ModalDirecionar
        open={modalDirecionarOpen}
        onOpenChange={setModalDirecionarOpen}
        denuncia={denunciaSelecionada}
        onDirecionar={handleDirecionar}
      />
    </div>
  );
}
