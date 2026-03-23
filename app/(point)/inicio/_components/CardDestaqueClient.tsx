"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Flame, ShoppingCart } from "lucide-react";
import { useCart } from "@/app/store/useCart";

interface ProdutoDestaque {
  id: string;
  nome: string;
  preco: number;
  precoPromocao: number | null;
  imageUrl: string | null;
  isDestaque: boolean;
}

export function CardDestaqueClient({ produtos }: { produtos: ProdutoDestaque[] }) {
  const addItem = useCart((state) => state.addItem);

  if (produtos.length === 0) return null;

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 px-4 mb-4">
        <div className="bg-orange-100 p-1.5 rounded-lg">
          <Flame className="size-5 text-orange-600 fill-orange-600" />
        </div>
        <h2 className="text-xl font-black italic uppercase tracking-tighter text-zinc-900">
          Destaques do <span className="text-orange-600">Fortão</span>
        </h2>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 pb-6 scrollbar-hide snap-x snap-mandatory">
        {produtos.map((produto) => {
          const valorFinal = produto.precoPromocao ?? produto.preco;
          
          return (
            <div 
              key={produto.id}
              className="min-w-[180px] md:min-w-[220px] snap-start group"
            >
              <div className="relative bg-white rounded-[2rem] p-3 border border-zinc-100 shadow-lg hover:shadow-orange-200/50 transition-all duration-300">
                
                {produto.precoPromocao && (
                  <Badge className="absolute top-3 left-3 bg-orange-600 hover:bg-orange-700 text-[10px] font-bold uppercase rounded-full border-none px-2 py-0.5 z-10 animate-pulse">
                    OFERTA
                  </Badge>
                )}

                <div className="aspect-square relative flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                  <img 
                    src={produto.imageUrl || "/placeholder-drink.png"} 
                    alt={produto.nome}
                    className="w-50 h-50 object-contain drop-shadow-2xl px-2"
                  />
                </div>

                <div className="space-y-1 text-center">
                  <h3 className="text-sm font-bold text-zinc-800 line-clamp-1 uppercase italic tracking-tighter">
                    {produto.nome}
                  </h3>
                  
                  <div className="flex flex-col">
                    {produto.precoPromocao && (
                      <span className="text-[10px] text-zinc-400 line-through leading-none">
                        R$ {produto.preco.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                    <p className="text-lg font-black text-orange-600 leading-tight">
                      R$ {valorFinal.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => addItem({
                      id: produto.id as any,
                      nome: produto.nome,
                      preco: valorFinal,
                      img: produto.imageUrl || "/placeholder-drink.png"
                    })}
                    className="w-full mt-2 flex items-center justify-center gap-2 bg-zinc-900 text-white py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all hover:bg-orange-600 shadow-md"
                  >
                    <ShoppingCart className="size-3" />
                    ADICIONAR
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}