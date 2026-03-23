"use client";

import React from "react";
import Image from "next/image";
import { Plus, Minus, Zap, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/store/useCart"; // Importando seu hook

interface CardPromocaoProps {
  produto: {
    id: string;
    nome: string;
    preco: any;
    precoPromocao: any;
    imageUrl: string | null;
    unidade: string;
  };
}

export function CardPromocao({ produto }: CardPromocaoProps) {
  const { items, addItem, removeItem } = useCart();

  // Encontra se este produto já está na sacola
  const itemNoCarrinho = items.find((item) => item.id === produto.id as any);
  const qtd = itemNoCarrinho?.quantity || 0;

  const precoOriginal = Number(produto.preco);
  const precoPromo = Number(produto.precoPromocao);
  const economia = precoOriginal - precoPromo;

  // Função para adicionar ao seu store global
  const handleAdd = () => {
    addItem({
      id: produto.id as any,
      nome: produto.nome,
      preco: precoPromo, // IMPORTANTE: Enviando o preço de promoção para o carrinho
      img: produto.imageUrl || "/placeholder.png",
    });
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-3 shadow-sm border border-gray-100 flex flex-col gap-2 relative transition-all active:scale-95">
      {/* Badge de Porcentagem */}
      <div className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg z-10 flex items-center gap-1">
        <Zap size={10} fill="white" />
        -{Math.round((economia / precoOriginal) * 100)}%
      </div>

      <div className="relative h-36 w-full rounded-[2rem] overflow-hidden bg-gray-50">
        <img 
          src={produto.imageUrl || "/placeholder.png"} 
          alt={produto.nome}
          
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-contain p-4"
        />
      </div>

      <div className="px-2 pb-2">
        <h3 className="text-sm font-bold text-gray-800 leading-tight h-10 line-clamp-2 italic uppercase">
          {produto.nome}
        </h3>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-gray-400 line-through tracking-tighter">
            R$ {precoOriginal.toFixed(2)}
          </span>
          <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded italic">
            OFERTA
          </span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-xs font-bold text-zinc-900">R$</span>
          <span className="text-2xl font-black text-zinc-900 italic">
            {precoPromo.toFixed(2)}
          </span>
        </div>

        {/* Botões de Ação conectados ao seu useCart */}
        {qtd === 0 ? (
          <button 
            onClick={handleAdd}
            className="w-full mt-3 bg-zinc-900 text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl active:bg-orange-600 transition-all"
          >
            <Plus size={14} /> Adicionar
          </button>
        ) : (
          <div className="w-full mt-3 flex items-center justify-between bg-orange-600 text-white rounded-2xl p-1 shadow-lg shadow-orange-100">
            <button 
              onClick={() => removeItem(produto.id as any)} 
              className="p-2 hover:bg-orange-700 rounded-xl transition-colors"
            >
              <Minus size={18} />
            </button>
            <span className="font-black text-lg italic">{qtd}</span>
            <button 
              onClick={handleAdd} 
              className="p-2 hover:bg-orange-700 rounded-xl transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}