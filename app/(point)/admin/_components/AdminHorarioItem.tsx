"use client";

import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

 // Opcional: para notificações bonitas
import { Loader2 } from "lucide-react";
import { upsertHorario } from "../_actions/horario-actions";

interface HorarioItemProps {
  dia: string;
  defaultAbertura?: string;
  defaultFechamento?: string;
  defaultAtivo?: boolean;
}

export function AdminHorarioItem({ 
  dia, 
  defaultAbertura = "18:00", 
  defaultFechamento = "02:00", 
  defaultAtivo = true 
}: HorarioItemProps) {
  const [isPending, startTransition] = useTransition();
  const [abertura, setAbertura] = useState(defaultAbertura);
  const [fechamento, setFechamento] = useState(defaultFechamento);
  const [ativo, setAtivo] = useState(defaultAtivo);

  const handleUpdate = (novoAtivo?: boolean) => {
    const statusAtivo = novoAtivo !== undefined ? novoAtivo : ativo;
    
    startTransition(async () => {
      const result = await upsertHorario({
        diaSemana: dia,
        abertura,
        fechamento,
        isFechado: !statusAtivo,
      });

      if (result.success) {
        // Se quiser usar o toast que instalamos antes
        console.log(`${dia} atualizado!`);
      }
    });
  };

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100 transition-all hover:border-orange-200">
      <div className="flex items-center gap-3">
        {isPending && <Loader2 className="size-4 animate-spin text-orange-600" />}
        <span className="font-bold text-zinc-700">{dia}</span>
      </div>

      <div className="flex items-center gap-4">
        <Input 
          type="time" 
          value={abertura} 
          onChange={(e) => setAbertura(e.target.value)}
          onBlur={() => handleUpdate()}
          className="w-24 rounded-lg bg-white border-zinc-200 focus:ring-orange-500" 
        />
        <span className="text-zinc-400 text-xs font-medium uppercase">até</span>
        <input 
          type="time" 
          value={fechamento} 
          onChange={(e) => setFechamento(e.target.value)}
          onBlur={() => handleUpdate()}
          className="flex h-10 w-24 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500" 
        />
        
        <Switch 
          checked={ativo} 
          onCheckedChange={(checked) => {
            setAtivo(checked);
            handleUpdate(checked);
          }}
          className="data-[state=checked]:bg-emerald-500" 
        />
      </div>
    </div>
  );
}