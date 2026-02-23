"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, Shield, Lock, Send } from "lucide-react"

export function DenunciaForm() {
  const [isAnonymous, setIsAnonymous] = useState(true)

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <AlertTriangle className="h-5 w-5 text-accent" />
              Formulario de Denuncia
            </CardTitle>
            <CardDescription>
              Preencha as informacoes abaixo com o maximo de detalhes possiveis. Quanto mais informacoes, melhor poderemos atuar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={(checked) => setIsAnonymous(checked === true)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="anonymous" className="font-medium cursor-pointer">
                      Desejo fazer uma denuncia anonima
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Sua identidade sera mantida em sigilo absoluto.
                    </p>
                  </div>
                </div>
              </div>

              {!isAnonymous && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Seu Nome</Label>
                    <Input id="nome" placeholder="Digite seu nome completo" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone para Contato</Label>
                    <Input id="telefone" type="tel" placeholder="(00) 00000-0000" />
                  </div>
                </div>
              )}

              <div className="border-t border-border pt-6">
                <h3 className="mb-4 font-semibold text-foreground">Dados da Vitima</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nomeVitima">Nome da Crianca/Adolescente</Label>
                    <Input id="nomeVitima" placeholder="Se souber, informe o nome" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idadeVitima">Idade Aproximada</Label>
                    <Input id="idadeVitima" placeholder="Ex: 8 anos" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="enderecoVitima">Endereco ou Local onde a vitima pode ser encontrada</Label>
                    <Input id="enderecoVitima" placeholder="Rua, numero, bairro, ponto de referencia" />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="mb-4 font-semibold text-foreground">Detalhes da Ocorrencia</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipoViolencia">Tipo de Violencia</Label>
                    <Select>
                      <SelectTrigger id="tipoViolencia">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fisica">Violencia Fisica</SelectItem>
                        <SelectItem value="psicologica">Violencia Psicologica</SelectItem>
                        <SelectItem value="sexual">Violencia Sexual</SelectItem>
                        <SelectItem value="negligencia">Negligencia</SelectItem>
                        <SelectItem value="abandono">Abandono</SelectItem>
                        <SelectItem value="trabalhoInfantil">Trabalho Infantil</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relato">Relato Detalhado</Label>
                    <Textarea
                      id="relato"
                      placeholder="Descreva a situacao com o maximo de detalhes: o que viu ou ouviu, quando aconteceu, quem sao os envolvidos, frequencia dos fatos..."
                      className="min-h-[150px] resize-y"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="dataOcorrencia">Data aproximada do fato</Label>
                      <Input id="dataOcorrencia" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequencia">Frequencia</Label>
                      <Select>
                        <SelectTrigger id="frequencia">
                          <SelectValue placeholder="Com que frequencia ocorre?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unico">Fato isolado</SelectItem>
                          <SelectItem value="recorrente">Recorrente</SelectItem>
                          <SelectItem value="constante">Constante/Diario</SelectItem>
                          <SelectItem value="naoSei">Nao sei informar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agressor">Informacoes sobre o suposto agressor (se souber)</Label>
                    <Textarea
                      id="agressor"
                      placeholder="Nome, relacao com a vitima, descricao fisica, endereco..."
                      className="min-h-[80px] resize-y"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-4">
                <Lock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Todas as informacoes fornecidas sao tratadas com sigilo e utilizadas exclusivamente para a protecao da crianca ou adolescente em situacao de risco.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Enviar Denuncia
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-accent/30 bg-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-accent" />
              Denuncia Urgente?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Se a crianca ou adolescente esta em perigo imediato, ligue agora:
            </p>
            <div className="space-y-2">
              <a
                href="tel:100"
                className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                Disque 100
              </a>
              <a
                href="tel:190"
                className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Policia Militar - 190
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Dicas Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Nao tente investigar ou confrontar o agressor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Quanto mais detalhes, mais rapida sera a acao</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Voce nao precisa ter certeza absoluta para denunciar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>Denunciar e um ato de amor e protecao</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">O que acontece apos a denuncia?</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  1
                </span>
                <span>A denuncia e registrada e analisada</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  2
                </span>
                <span>O Conselho Tutelar verifica a situacao</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  3
                </span>
                <span>Medidas de protecao sao aplicadas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  4
                </span>
                <span>Acompanhamento ate a resolucao do caso</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
