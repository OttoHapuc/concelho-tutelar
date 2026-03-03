"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Shield,
  Menu,
  X,
  BarChart3,
  Users,
  ClipboardList,
  Activity,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MenuGroup {
  title: string;
  role: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
}

const menuGroups: MenuGroup[] = [
  {
    title: "Secretaria",
    role: "Secretário(a)",
    items: [
      {
        label: "Painel Secretaria",
        href: "/dashboard/secretaria",
        icon: LayoutDashboard,
      },
      {
        label: "Nova Denúncia",
        href: "/dashboard/denuncia",
        icon: FileText,
      },
    ],
  },
  {
    title: "Direção",
    role: "Diretor(a)",
    items: [
      {
        label: "Panorama Geral",
        href: "/dashboard/diretor",
        icon: BarChart3,
      },
      {
        label: "Equipe em Campo",
        href: "/dashboard/diretor/equipe",
        icon: Users,
      },
      {
        label: "Triagem e Direcionamento",
        href: "/dashboard/diretor/triagem",
        icon: ClipboardList,
      },
    ],
  },
  {
    title: "Operação",
    role: "Conselheiro(a)",
    items: [
      {
        label: "Painel Operacional",
        href: "/dashboard/operacao",
        icon: Activity,
      },
      {
        label: "Relatórios",
        href: "/dashboard/operacao/relatorios",
        icon: FileText,
      },
      {
        label: "Encaminhamentos",
        href: "/dashboard/operacao/encaminhamentos",
        icon: Send,
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <Shield className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Conselho Tutelar</h1>
              <p className="text-xs text-sidebar-foreground/70">
                Área Administrativa
              </p>
            </div>
          </div>

          {/* User info */}
          <div className="border-b border-sidebar-border px-6 py-4">
            <p className="text-xs text-sidebar-foreground/70 uppercase tracking-wider mb-1">
              Usuário
            </p>
            <p className="font-medium text-sm">Maria Silva</p>
            <p className="text-xs text-sidebar-foreground/70">Secretária</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            {menuGroups.map((group) => (
              <div key={group.title} className="mb-6">
                <p className="text-xs text-sidebar-foreground/50 uppercase tracking-wider mb-3 px-2">
                  {group.title}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sair do Sistema
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
