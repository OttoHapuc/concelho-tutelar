"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import LoginForm from "./components/page.login.login-form";
import TwoFactorSelection from "./components/page.login.two-factor-section";

export default function LoginPage() {
  const [step, setStep] = useState<"login" | "2fa">("login");
  const [userEmail, setUserEmail] = useState("");

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setStep("2fa");
  };

  const handleBack = () => {
    setStep("login");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Painel Esquerdo - Institucional */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-primary-foreground/10 rounded-xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">
                Conselho Tutelar
              </h1>
              <p className="text-primary-foreground/70 text-sm">
                Sistema de Gestão
              </p>
            </div>
          </div>

          <h2 className="text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight mb-6 text-balance">
            Protegendo o futuro das nossas crianças
          </h2>

          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8 max-w-md">
            Acesse o sistema para gerenciar denúncias, acompanhar casos e 
            garantir a proteção integral de crianças e adolescentes.
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">1</span>
              </div>
              <span className="text-primary-foreground/90">
                Gestão completa de denúncias
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">2</span>
              </div>
              <span className="text-primary-foreground/90">
                Acompanhamento de casos em tempo real
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">3</span>
              </div>
              <span className="text-primary-foreground/90">
                Relatórios e estatísticas detalhadas
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Painel Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header Mobile */}
        <div className="lg:hidden bg-primary p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary-foreground">
                Conselho Tutelar
              </h1>
              <p className="text-primary-foreground/70 text-xs">
                Sistema de Gestão
              </p>
            </div>
          </div>
        </div>

        {/* Conteúdo do Formulário */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {step === "login" ? (
              <LoginForm onSuccess={handleLoginSuccess} />
            ) : (
              <TwoFactorSelection email={userEmail} onBack={handleBack} />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>Conselho Tutelar - Sistema de Gestão</p>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-primary transition-colors">
                Voltar ao site
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Suporte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
