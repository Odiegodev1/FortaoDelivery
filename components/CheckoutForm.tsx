"use client";

import { useState } from "react";
import { useCart } from "@/app/store/useCart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Smartphone, CreditCard, Banknote, Send, Loader2 } from "lucide-react";

interface CheckoutFormProps {
  onSuccess: () => void;
}

export function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const { items, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [metodoPagamento, setMetodoPagamento] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!metodoPagamento) {
      alert("Por favor, selecione uma forma de pagamento.");
      return;
    }

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Preparamos os dados mínimos para a API validar
    const payload = {
      nome: formData.get("nome"),
      endereco: formData.get("endereco"),
      pagamento: metodoPagamento,
      troco: formData.get("troco") || "Não necessário",
      // Enviamos apenas ID e Quantidade para o servidor buscar o preço real
      itens: items.map(item => ({ 
        id: item.id, 
        quantity: item.quantity 
      }))
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resultado = await response.json();

      if (!resultado.success) {
        throw new Error(resultado.error || "Erro ao validar pedido");
      }

      // Montagem da mensagem usando os dados que o SERVIDOR confirmou
      const itensTexto = resultado.itensValidados
        .map((item: any) => `- ${item.quantidade}x ${item.nome} (R$ ${item.preco.toFixed(2)})`)
        .join('%0A');

      const mensagemWhatsApp = 
        `*NOVO PEDIDO - POINT DO FORTÃO*%0A` +
        `--------------------------------%0A` +
        `*Cliente:* ${resultado.cliente.nome}%0A` +
        `*Endereço:* ${resultado.cliente.endereco}%0A` +
        `*Pagamento:* ${resultado.cliente.pagamento.toUpperCase()}%0A` +
        `*Troco:* ${resultado.cliente.troco}%0A` +
        `--------------------------------%0A` +
        `*ITENS:*%0A${itensTexto}%0A` +
        `--------------------------------%0A` +
        `*TOTAL VALIDADO: R$ ${resultado.totalValidado.toFixed(2).replace('.', ',')}*`;

      // Abre o WhatsApp com o número do Fortão
      window.open(`https://wa.me/5522999650436?text=${mensagemWhatsApp}`, "_blank");
      
      clearCart();
      onSuccess();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Ocorreu um erro ao processar seu pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      {/* Dados do Cliente */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase text-zinc-400 ml-1 italic">Quem recebe?</Label>
          <Input 
            name="nome" 
            placeholder="Seu nome completo" 
            required 
            className="rounded-2xl bg-zinc-100 border-none h-12 focus-visible:ring-orange-600 font-medium" 
          />
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase text-zinc-400 ml-1 flex items-center gap-1 italic">
            <Truck className="size-3" /> Endereço em Jaconé
          </Label>
          <Input 
            name="endereco" 
            placeholder="Rua, número e ponto de referência" 
            required 
            className="rounded-2xl bg-zinc-100 border-none h-12 focus-visible:ring-orange-600 font-medium" 
          />
        </div>
      </div>

      {/* Opções de Pagamento */}
      <div className="space-y-3">
        <Label className="text-[10px] font-black uppercase text-zinc-400 ml-1 italic">Forma de Pagamento</Label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setMetodoPagamento("pix")}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
              metodoPagamento === "pix" ? "border-orange-600 bg-orange-50 text-orange-600 shadow-lg shadow-orange-100" : "border-zinc-100 bg-zinc-50 text-zinc-500"
            }`}
          >
            <Smartphone className="size-5 mb-1" />
            <span className="text-[10px] font-black uppercase">PIX</span>
          </button>

          <button
            type="button"
            onClick={() => setMetodoPagamento("cartao")}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
              metodoPagamento === "cartao" ? "border-orange-600 bg-orange-50 text-orange-600 shadow-lg shadow-orange-100" : "border-zinc-100 bg-zinc-50 text-zinc-500"
            }`}
          >
            <CreditCard className="size-5 mb-1" />
            <span className="text-[10px] font-black uppercase">Cartão</span>
          </button>

          <button
            type="button"
            onClick={() => setMetodoPagamento("dinheiro")}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all ${
              metodoPagamento === "dinheiro" ? "border-orange-600 bg-orange-50 text-orange-600 shadow-lg shadow-orange-100" : "border-zinc-100 bg-zinc-50 text-zinc-500"
            }`}
          >
            <Banknote className="size-5 mb-1" />
            <span className="text-[10px] font-black uppercase">Dinheiro</span>
          </button>
        </div>
      </div>

      {/* Troco Condicional */}
      {metodoPagamento === "dinheiro" && (
        <div className="space-y-2 animate-in zoom-in-95 duration-200">
          <Label className="text-[10px] font-black uppercase text-orange-600 ml-1 italic">Troco para quanto?</Label>
          <Input 
            name="troco" 
            type="number" 
            placeholder="Ex: 50" 
            required 
            className="rounded-2xl bg-orange-50 border-orange-100 h-12 focus-visible:ring-orange-600 font-bold text-orange-700" 
          />
        </div>
      )}

      {/* Botão de Envio */}
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-zinc-950 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 shadow-xl mt-4"
      >
        {loading ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            VALIDANDO PREÇOS...
          </>
        ) : (
          <>
            ENVIAR PARA O WHATSAPP
            <Send className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}