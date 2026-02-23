"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  MapPin,
  Car,
} from "lucide-react";

// Dados fake de denúncias do dia
const denunciasHoje = [
  {
    id: "DEN-2026-0142",
    hora: "08:15",
    tipo: "Negligência",
    bairro: "Centro",
    status: "em_andamento",
    responsavel: "Carlos Oliveira",
  },
  {
    id: "DEN-2026-0143",
    hora: "09:30",
    tipo: "Violência Física",
    bairro: "Jardim das Flores",
    status: "pendente",
    responsavel: null,
  },
  {
    id: "DEN-2026-0144",
    hora: "10:45",
    tipo: "Abandono",
    bairro: "Vila Nova",
    status: "em_andamento",
    responsavel: "Ana Santos",
  },
  {
    id: "DEN-2026-0145",
    hora: "11:20",
    tipo: "Violência Psicológica",
    bairro: "Centro",
    status: "concluida",
    responsavel: "Carlos Oliveira",
  },
  {
    id: "DEN-2026-0146",
    hora: "14:00",
    tipo: "Negligência",
    bairro: "Parque Industrial",
    status: "pendente",
    responsavel: null,
  },
];

// Dados fake dos conselheiros/operacionais
const operacionais = [
  {
    id: 1,
    nome: "Carlos Oliveira",
    cargo: "Conselheiro Tutelar",
    status: "externo",
    localizacao: "Jardim das Flores - Visita domiciliar",
    horaSaida: "09:45",
  },
  {
    id: 2,
    nome: "Ana Santos",
    cargo: "Conselheira Tutelar",
    status: "na_unidade",
    localizacao: "Sala de Atendimento 02",
    horaSaida: null,
  },
  {
    id: 3,
    nome: "Roberto Lima",
    cargo: "Conselheiro Tutelar",
    status: "externo",
    localizacao: "Fórum - Audiência",
    horaSaida: "08:30",
  },
  {
    id: 4,
    nome: "Fernanda Costa",
    cargo: "Conselheira Tutelar",
    status: "na_unidade",
    localizacao: "Sala de Reunião",
    horaSaida: null,
  },
  {
    id: 5,
    nome: "Marcos Pereira",
    cargo: "Conselheiro Tutelar",
    status: "externo",
    localizacao: "Escola Municipal - Palestra",
    horaSaida: "13:00",
  },
];

function getStatusBadge(status: string) {
  switch (status) {
    case "pendente":
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="h-3 w-3" />
          Pendente
        </Badge>
      );
    case "em_andamento":
      return (
        <Badge className="gap-1 bg-amber-600 hover:bg-amber-700">
          <Clock className="h-3 w-3" />
          Em Andamento
        </Badge>
      );
    case "concluida":
      return (
        <Badge className="gap-1 bg-emerald-600 hover:bg-emerald-700">
          <CheckCircle className="h-3 w-3" />
          Concluída
        </Badge>
      );
    default:
      return <Badge variant="secondary">Desconhecido</Badge>;
  }
}

function getOperacionalStatus(status: string) {
  if (status === "na_unidade") {
    return (
      <Badge className="gap-1 bg-emerald-600 hover:bg-emerald-700">
        <MapPin className="h-3 w-3" />
        Na Unidade
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="gap-1 border-amber-500 text-amber-600">
      <Car className="h-3 w-3" />
      Em Campo
    </Badge>
  );
}

export default function SecretariaPage() {
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalDenuncias = denunciasHoje.length;
  const denunciasPendentes = denunciasHoje.filter(
    (d) => d.status === "pendente"
  ).length;
  const denunciasAndamento = denunciasHoje.filter(
    (d) => d.status === "em_andamento"
  ).length;
  const denunciasConcluidas = denunciasHoje.filter(
    (d) => d.status === "concluida"
  ).length;

  const operacionaisUnidade = operacionais.filter(
    (o) => o.status === "na_unidade"
  ).length;
  const operacionaisExternos = operacionais.filter(
    (o) => o.status === "externo"
  ).length;

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Painel da Secretaria
        </h1>
        <p className="text-muted-foreground capitalize">{hoje}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Denúncias Hoje
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalDenuncias}</div>
            <p className="text-xs text-muted-foreground mt-1">
              registradas no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendentes
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">
              {denunciasPendentes}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              aguardando atribuição
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Na Unidade
            </CardTitle>
            <MapPin className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">
              {operacionaisUnidade}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              conselheiros disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Em Campo
            </CardTitle>
            <Car className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">
              {operacionaisExternos}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              conselheiros externos
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Denúncias do Dia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Denúncias do Dia
            </CardTitle>
            <CardDescription>
              Acompanhe todas as denúncias registradas hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {denunciasHoje.map((denuncia) => (
                <div
                  key={denuncia.id}
                  className="flex items-start justify-between gap-4 rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium">
                        {denuncia.id}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {denuncia.hora}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{denuncia.tipo}</p>
                    <p className="text-xs text-muted-foreground">
                      {denuncia.bairro}
                    </p>
                    {denuncia.responsavel && (
                      <p className="text-xs text-primary">
                        Responsável: {denuncia.responsavel}
                      </p>
                    )}
                  </div>
                  <div>{getStatusBadge(denuncia.status)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status dos Operacionais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Equipe Operacional
            </CardTitle>
            <CardDescription>
              Status atual dos conselheiros tutelares
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operacionais.map((pessoa) => (
                <div
                  key={pessoa.id}
                  className="flex items-start justify-between gap-4 rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{pessoa.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {pessoa.cargo}
                    </p>
                    <p className="text-xs text-primary">{pessoa.localizacao}</p>
                    {pessoa.horaSaida && (
                      <p className="text-xs text-muted-foreground">
                        Saída: {pessoa.horaSaida}
                      </p>
                    )}
                  </div>
                  <div>{getOperacionalStatus(pessoa.status)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo do dia */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Resumo do Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-destructive" />
                <span className="text-sm font-medium">Pendentes</span>
              </div>
              <p className="text-2xl font-bold">{denunciasPendentes}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="text-sm font-medium">Em Andamento</span>
              </div>
              <p className="text-2xl font-bold">{denunciasAndamento}</p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium">Concluídas</span>
              </div>
              <p className="text-2xl font-bold">{denunciasConcluidas}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
