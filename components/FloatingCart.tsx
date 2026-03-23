"use client";

import { useCart } from "@/app/store/useCart";
import { ShoppingBag, X, Plus, Minus } from "lucide-react";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm"; // Importando o novo componente

export function FloatingCart() {
  const { items, addItem, removeItem, totalPrice, totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || totalItems() === 0) return null;

  return (
    <>
      {/* Botão Flutuante */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-md">
        <button onClick={() => setIsOpen(true)} className="w-full bg-zinc-950 text-white p-4 rounded-[2.5rem] flex items-center justify-between shadow-2xl border border-zinc-800 active:scale-95 transition-transform">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 p-2 rounded-xl"><ShoppingBag className="size-5" /></div>
            <span className="font-bold uppercase italic text-sm">Minha Sacola ({totalItems()})</span>
          </div>
          <span className="font-black text-lg italic text-orange-500">R$ {totalPrice().toFixed(2)}</span>
        </button>
      </div>

      {/* Sidebar do Carrinho */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="h-full w-full max-w-md bg-white rounded-l-[3rem] shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">Sua <span className="text-orange-600">Sacola</span></h2>
              <button onClick={() => setIsOpen(false)} className="p-2 bg-zinc-100 rounded-full hover:rotate-90 transition-transform"><X /></button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-zinc-50 p-4 rounded-3xl border border-zinc-100">
                  <div className="flex-grow">
                    <h4 className="font-bold text-zinc-900 text-sm uppercase italic">{item.nome}</h4>
                    <p className="text-orange-600 font-black text-xs">R$ {item.preco.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-1 rounded-2xl border border-zinc-200">
                    <button onClick={() => removeItem(item.id)}><Minus className="size-4" /></button>
                    <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => addItem(item)}><Plus className="size-4" /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-zinc-500 font-bold uppercase text-[10px]">Subtotal</span>
                <span className="text-3xl font-black italic">R$ {totalPrice().toFixed(2)}</span>
              </div>

              {/* Modal de Checkout */}
           <Dialog>
  <DialogTrigger asChild>
    <button className="w-full bg-zinc-900 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:bg-orange-600 transition-all shadow-xl">
      Finalizar Pedido
    </button>
  </DialogTrigger>
  
  {/* O segredo está no z-[130] e no pointer-events-auto */}
  <DialogContent className="z-[130] max-w-[95vw] sm:max-w-[425px] rounded-[2.5rem] p-6 border-none shadow-[0_0_50px_rgba(0,0,0,0.3)]">
    <DialogHeader>
      <DialogTitle className="text-2xl font-black uppercase italic text-center">
        Checkout <span className="text-orange-600">Fortão</span>
      </DialogTitle>
    </DialogHeader>
    
    <CheckoutForm onSuccess={() => setIsOpen(false)} />
  </DialogContent>
</Dialog>
            </div>
          </div>
        </div>
      )}
    </>
  );
}