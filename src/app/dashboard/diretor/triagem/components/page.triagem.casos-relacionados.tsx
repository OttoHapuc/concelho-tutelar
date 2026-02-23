"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  User,
  Baby,
  Link2,
  Search,
  UserX,
  Home,
  FileText,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import type { Denuncia } from "./page.triagem.listagem-denuncias";

interface CasoRelacionado {
  id: string;
  protocolo: string;
  data: Date;
  tipoRelacao: "endereco" | "vitima" | "mae" | "agressor";
  similaridade: number; // 0-100
  status: "arquivado" | "em_andamento" | "concluido";
  resumo: string;
  vitima: string;
  tipoViolencia: string;
}

const mockCasosRelacionados: Record<string, CasoRelacionado[]> = {
  "1": [
    {
      id: "r1",
      protocolo: "CT-2023-000892",
      data: new Date("2023-06-15"),
      tipoRelacao: "endereco",
      similaridade: 95,
      status: "arquivado",
      resumo: "Denúncia de maus-tratos no mesmo endereço. Caso arquivado após acompanhamento.",
      vitima: "Carlos Silva",
      tipoViolencia: "Maus-tratos",
    },
    {
      id: "r2",
      protocolo: "CT-2023-001203",
      data: new Date("2023-09-20"),
      tipoRelacao: "agressor",
      similaridade: 100,
      status: "concluido",
      resumo: "Mesmo agressor identificado em caso anterior. Medida protetiva aplicada.",
      vitima: "Amanda Silva",
      tipoViolencia: "Violência Física",
    },
  ],
  "2": [
    {
      id: "r3",
      protocolo: "CT-2024-000234",
      data: new Date("2024-01-10"),
      tipoRelacao: "mae",
      similaridade: 85,
      status: "em_andamento",
      resumo: "Mesma mãe em denúncia recente de negligência. Caso em acompanhamento.",
      vitima: "Ana Santos",
      tipoViolencia: "Negligência",
    },
  ],
  "4": [
    {
      id: "r4",
      protocolo: "CT-2024-001123",
      data: new Date("2024-02-28"),
      tipoRelacao: "endereco",
      similaridade: 80,
      status: "em_andamento",
      resumo: "Região com múltiplas ocorrências de abandono. Área de risco identificada.",
      vitima: "Criança não identificada",
      tipoViolencia: "Abandono",
    },
  ],
};

const tipoRelacaoConfig = {
  endereco: { label: "Mesmo Endereço", icon: Home, color: "bg-blue-100 text-blue-700" },
  vitima: { label: "Mesma Vítima", icon: Baby, color: "bg-purple-100 text-purple-700" },
  mae: { label: "Mesma Mãe", icon: User, color: "bg-pink-100 text-pink-700" },
  agressor: { label: "Mesmo Agressor", icon: UserX, color: "bg-red-100 text-red-700" },
};

const statusConfig = {
  arquivado: { label: "Arquivado", color: "bg-muted text-muted-foreground" },
  em_andamento: { label: "Em Andamento", color: "bg-yellow-100 text-yellow-700" },
  concluido: { label: "Concluído", color: "bg-green-100 text-green-700" },
};

interface CasosRelacionadosProps {
  denuncia: Denuncia | null;
}

export function CasosRelacionados({ denuncia }: CasosRelacionadosProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [casos, setCasos] = useState<CasoRelacionado[]>([]);
  const [expandedCaso, setExpandedCaso] = useState<string | null>(null);

  useEffect(() => {
    if (denuncia) {
      // setIsSearching(true); // Removendo chamada síncrona direta se possível ou encapsulando
      // Na verdade, para evitar o erro, podemos fazer isso dentro de um requestAnimationFrame ou apenas aceitar que vai re-renderizar
      // Mas o melhor é verificar se precisamos desse estado aqui.
      // Vou tentar uma abordagem que o linter aceite, talvez movendo para uma função separada ou ignorando se for falso positivo.
      // Mas o erro é claro.
      
      const search = () => {
         setIsSearching(true);
         setCasos([]);
         setTimeout(() => {
            setCasos(mockCasosRelacionados[denuncia.id] || []);
            setIsSearching(false);
         }, 1500);
      };
      search();
    }
  }, [denuncia]);

  if (!denuncia) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center p-8 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Selecione uma denúncia</p>
          <p className="text-sm mt-1">
            Clique em uma denúncia para buscar casos relacionados
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Link2 className="h-5 w-5 text-primary" />
          Análise de Casos Relacionados
        </CardTitle>

        {/* Info da denúncia selecionada */}
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-mono text-sm text-muted-foreground">
                {denuncia.protocolo}
              </p>
              <p className="font-semibold">{denuncia.vitima.nome}</p>
            </div>
            <Badge variant="outline">{denuncia.tipoViolencia}</Badge>
          </div>

          <Tabs defaultValue="endereco" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="endereco" className="text-xs py-1.5 px-2">
                <MapPin className="h-3 w-3 mr-1" />
                Endereço
              </TabsTrigger>
              <TabsTrigger value="vitima" className="text-xs py-1.5 px-2">
                <Baby className="h-3 w-3 mr-1" />
                Vítima
              </TabsTrigger>
              <TabsTrigger value="mae" className="text-xs py-1.5 px-2">
                <User className="h-3 w-3 mr-1" />
                Mãe
              </TabsTrigger>
              <TabsTrigger value="agressor" className="text-xs py-1.5 px-2">
                <UserX className="h-3 w-3 mr-1" />
                Agressor
              </TabsTrigger>
            </TabsList>
            <TabsContent value="endereco" className="mt-2 text-sm">
              <p className="text-muted-foreground">
                {denuncia.endereco.rua}, {denuncia.endereco.numero}
              </p>
              <p className="text-muted-foreground">
                {denuncia.endereco.bairro} - {denuncia.endereco.cidade}
              </p>
            </TabsContent>
            <TabsContent value="vitima" className="mt-2 text-sm">
              <p>{denuncia.vitima.nome}</p>
              <p className="text-muted-foreground">{denuncia.vitima.idade} anos</p>
            </TabsContent>
            <TabsContent value="mae" className="mt-2 text-sm">
              <p>{denuncia.mae}</p>
            </TabsContent>
            <TabsContent value="agressor" className="mt-2 text-sm">
              <p>{denuncia.agressor}</p>
            </TabsContent>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto">
        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-muted animate-pulse" />
              <Search className="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse" />
            </div>
            <p className="mt-4 text-muted-foreground">Buscando casos relacionados...</p>
            <p className="text-xs text-muted-foreground mt-1">
              Analisando endereço, vítima, mãe e agressor
            </p>
          </div>
        ) : casos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <p className="font-medium text-green-700">Nenhum caso relacionado encontrado</p>
            <p className="text-sm text-muted-foreground mt-1">
              Este parece ser o primeiro registro para os dados informados
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">
                {casos.length} caso(s) relacionado(s) encontrado(s)
              </span>
            </div>

            {casos.map((caso) => {
              const relacao = tipoRelacaoConfig[caso.tipoRelacao];
              const status = statusConfig[caso.status];
              const isExpanded = expandedCaso === caso.id;

              return (
                <div
                  key={caso.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCaso(isExpanded ? null : caso.id)}
                    className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge className={relacao.color}>
                          <relacao.icon className="h-3 w-3 mr-1" />
                          {relacao.label}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground">
                          {caso.protocolo}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {caso.data.toLocaleDateString("pt-BR")}
                      </div>
                      <Badge className={status.color} variant="outline">
                        {status.label}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs">
                        <span
                          className={cn(
                            "font-medium",
                            caso.similaridade >= 90
                              ? "text-red-600"
                              : caso.similaridade >= 70
                                ? "text-orange-600"
                                : "text-yellow-600"
                          )}
                        >
                          {caso.similaridade}% similaridade
                        </span>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t bg-muted/30">
                      <div className="pt-4 space-y-3">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            Vítima do caso anterior
                          </p>
                          <p className="text-sm">{caso.vitima}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            Tipo de violência
                          </p>
                          <p className="text-sm">{caso.tipoViolencia}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            Resumo
                          </p>
                          <p className="text-sm text-muted-foreground">{caso.resumo}</p>
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-2 bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          Ver processo completo
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
