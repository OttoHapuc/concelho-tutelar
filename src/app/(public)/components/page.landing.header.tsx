"use client";

import Link from "next/link";
import { Shield, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight text-foreground">
              Conselho Tutelar
            </span>
            <span className="text-xs text-muted-foreground">
              Protegendo Vidas
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Inicio
          </Link>
          <Link
            href="/denuncia"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Fazer Denuncia
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/denuncia">Denunciar Agora</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border bg-card md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/denuncia"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Fazer Denuncia
            </Link>
            <div className="mt-2 pt-2 border-t border-border">
              <Button
                asChild
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/denuncia" onClick={() => setIsMenuOpen(false)}>
                  Denunciar Agora
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
