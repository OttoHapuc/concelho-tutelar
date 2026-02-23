"use client";

import { useState } from "react";
import { ArrowLeft, Smartphone, Mail, Camera, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TwoFactorSelectionProps {
  email: string;
  onBack: () => void;
}

type TwoFactorMethod = "sms" | "email" | "selfie" | null;

const methods = [
  {
    id: "sms" as const,
    title: "Código por SMS",
    description: "Receba um código de 6 dígitos no seu celular cadastrado",
    icon: Smartphone,
    detail: "Celular terminado em ****-7890",
  },
  {
    id: "email" as const,
    title: "Código por E-mail",
    description: "Receba um código de 6 dígitos no seu e-mail",
    icon: Mail,
    detail: "E-mail mascarado será exibido",
  },
  {
    id: "selfie" as const,
    title: "Reconhecimento Facial",
    description: "Tire uma selfie para confirmar sua identidade",
    icon: Camera,
    detail: "Requer acesso à câmera",
  },
];

export default function TwoFactorSelection({
  email,
  onBack,
}: TwoFactorSelectionProps) {
  const [selectedMethod, setSelectedMethod] = useState<TwoFactorMethod>(null);
  const [isHovering, setIsHovering] = useState<TwoFactorMethod>(null);

  // Mascara o email para exibição
  const maskEmail = (email: string) => {
    const [user, domain] = email.split("@");
    const maskedUser = user.slice(0, 2) + "***" + user.slice(-1);
    return `${maskedUser}@${domain}`;
  };

  const handleMethodSelect = (method: TwoFactorMethod) => {
    setSelectedMethod(method);
    // Aqui você navegaria para a tela específica do método escolhido
    // Por enquanto, apenas seleciona visualmente
  };

  return (
    <Card className="border-0 shadow-none lg:border lg:shadow-sm">
      <CardHeader className="space-y-1 px-0 lg:px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2 w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar ao login</span>
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Verificação em duas etapas
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Escolha como deseja confirmar sua identidade
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0 lg:px-6">
        <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-sm text-muted-foreground">
            Logando como:{" "}
            <span className="font-medium text-foreground">
              {maskEmail(email)}
            </span>
          </p>
        </div>

        <div className="space-y-3">
          {methods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            const isHovered = isHovering === method.id;

            // Atualiza o detalhe do email se for o método de email
            const detail =
              method.id === "email" ? maskEmail(email) : method.detail;

            return (
              <button
                key={method.id}
                onClick={() => handleMethodSelect(method.id)}
                onMouseEnter={() => setIsHovering(method.id)}
                onMouseLeave={() => setIsHovering(null)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left group ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : isHovered
                      ? "border-primary/50 bg-muted/30"
                      : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold mb-0.5 ${
                        isSelected ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {method.description}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {detail}
                    </p>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      isSelected
                        ? "text-primary translate-x-1"
                        : "text-muted-foreground group-hover:translate-x-1"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {selectedMethod && (
          <div className="mt-6 pt-6 border-t border-border">
            <Button
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              onClick={() => {
                // Navegaria para a tela específica do método
                alert(
                  `Redirecionando para verificação por ${
                    methods.find((m) => m.id === selectedMethod)?.title
                  }`
                );
              }}
            >
              Continuar com{" "}
              {methods.find((m) => m.id === selectedMethod)?.title}
            </Button>
          </div>
        )}

        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Por que isso é necessário?</strong>
            <br />
            A verificação em duas etapas adiciona uma camada extra de segurança,
            protegendo informações sensíveis de crianças e adolescentes contra
            acessos não autorizados.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
