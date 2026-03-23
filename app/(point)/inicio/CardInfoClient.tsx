"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, Info, Phone, Navigation } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CardInfoProps {
  horarios: any[];
  endereco: string;
  telefone: string;
}

export function CardInfoClient({ horarios, endereco, telefone }: CardInfoProps) {
  const [status, setStatus] = useState({ label: "Carregando...", isOpen: false });

  useEffect(() => {
    const checkStatus = () => {
      const agora = new Date();
      // Ajuste para o fuso horário local se necessário, mas o Date() do navegador resolve para o cliente
      const diaSemanaIndex = agora.getDay(); 
      const horaAtual = agora.getHours() * 100 + agora.getMinutes();

      // Mapeamento exato dos nomes que você salvou no banco
      const diasMap: any = { 
        "Domingo": 0, "Segunda": 1, "Terça": 2, "Quarta": 3, 
        "Quinta": 4, "Sexta": 5, "Sábado": 6 
      };

      const hoje = horarios.find((h: any) => diasMap[h.diaSemana] === diaSemanaIndex);

      if (hoje && !hoje.isFechado) {
        const abertura = parseInt(hoje.abertura.replace(":", ""));
        const fechamento = parseInt(hoje.fechamento.replace(":", ""));

        let aberto = false;
        // Lógica para horários que viram a noite (ex: abre 18:00 e fecha 02:00)
        if (fechamento < abertura) {
          aberto = horaAtual >= abertura || horaAtual <= fechamento;
        } else {
          aberto = horaAtual >= abertura && horaAtual <= fechamento;
        }

        if (aberto) {
          setStatus({ label: `Aberto até ${hoje.fechamento}`, isOpen: true });
        } else {
          setStatus({ label: "Fechado agora", isOpen: false });
        }
      } else {
        setStatus({ label: "Fechado hoje", isOpen: false });
      }
    };

    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, [horarios]);

  return (
    <div className="w-full mx-auto">
      <Card className="overflow-hidden border-none shadow-2xl bg-white/80 backdrop-blur-md">
        <CardHeader className="pb-2">
          <div className="flex flex-col items-center justify-center">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative flex items-center justify-center bg-white rounded-full p-1.5 shadow-xl">
                <Image 
                  src="/logo.png" 
                  alt="logo" 
                  width={160} 
                  height={160} 
                  className="size-28 md:size-32 rounded-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110" 
                />
              </div>
            </div>
            <div className="mt-6 w-16 h-1 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black tracking-tight text-zinc-900 uppercase italic">
              Point do Fortão
            </h1>
            <div className="flex items-center justify-center gap-2 text-zinc-500">
              <MapPin className="size-4 text-orange-600" />
              <span className="text-sm font-medium">{endereco}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full pt-2">
            <div className="flex items-center justify-center gap-3 py-2 px-4 bg-zinc-100/50 rounded-2xl border border-zinc-200/50">
              
              <Dialog>
                <DialogTrigger asChild>
                  <div className="flex items-center gap-1.5 text-zinc-700 cursor-pointer hover:text-orange-600 transition-colors">
                    <Info className="size-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Mais informações</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="rounded-[2.5rem] border-none max-w-[90vw] sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-black uppercase italic tracking-tighter text-center">
                      Detalhes do <span className="text-orange-600">Point</span>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4 pt-4 text-left">
                    <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <Navigation className="size-5 text-orange-600 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-zinc-400">Localização</span>
                        <span className="text-sm font-bold text-zinc-700 italic uppercase">{endereco}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <Phone className="size-5 text-orange-600 shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase text-zinc-400">WhatsApp</span>
                        <span className="text-sm font-bold text-zinc-700">{telefone}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[10px] font-black uppercase text-zinc-400 px-1">Horários da Semana</h3>
                      <div className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm">
                        {horarios.map((h: any) => (
                          <div key={h.id} className="flex justify-between p-3 border-b border-zinc-50 last:border-none px-5 text-[10px] font-bold uppercase italic">
                            <span className="text-zinc-500">{h.diaSemana}</span>
                            <span className={h.isFechado ? "text-red-500" : "text-zinc-900"}>
                              {h.isFechado ? "FECHADO" : `${h.abertura} — ${h.fechamento}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="h-4 w-[1px] bg-zinc-300" />

              <div className="flex items-center gap-2">
                <div className="relative flex size-2">
                  {status.isOpen && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span className={`relative inline-flex rounded-full size-2 ${status.isOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                </div>
                <span className={`text-xs font-bold uppercase ${status.isOpen ? 'text-emerald-600' : 'text-red-600'}`}>
                  {status.label}
                </span>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}