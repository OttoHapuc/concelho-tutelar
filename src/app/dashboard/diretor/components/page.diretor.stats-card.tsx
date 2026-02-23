"use client";

import React from "react"

import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "warning" | "success" | "danger";
}

function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  variant = "default",
}: StatCardProps) {
  const variantStyles = {
    default: "border-border",
    warning: "border-amber-200 bg-amber-50/50",
    success: "border-emerald-200 bg-emerald-50/50",
    danger: "border-red-200 bg-red-50/50",
  };

  return (
    <Card className={variantStyles[variant]}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-2.5">{icon}</div>
        </div>
        {trend && (
          <div className="mt-3 flex items-center gap-1 border-t border-border pt-3">
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span
              className={`text-sm font-medium ${
                trend.isPositive ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
            <span className="text-sm text-muted-foreground">vs. semana anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StatsCardsDiretor() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      <StatCard
        title="Denúncias Hoje"
        value={18}
        description="Recebidas nas últimas 24h"
        icon={<FileText className="h-5 w-5 text-primary" />}
        trend={{ value: 12, isPositive: false }}
      />
      <StatCard
        title="Em Andamento"
        value={24}
        description="Ações em execução"
        icon={<Clock className="h-5 w-5 text-amber-600" />}
        variant="warning"
      />
      <StatCard
        title="Casos Críticos"
        value={3}
        description="Requerem atenção urgente"
        icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
        variant="danger"
      />
      <StatCard
        title="Concluídas Hoje"
        value={7}
        description="Ações finalizadas"
        icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
        variant="success"
        trend={{ value: 23, isPositive: true }}
      />
      <StatCard
        title="Equipe em Campo"
        value="4/5"
        description="Operacionais ativos"
        icon={<Users className="h-5 w-5 text-primary" />}
      />
    </div>
  );
}
