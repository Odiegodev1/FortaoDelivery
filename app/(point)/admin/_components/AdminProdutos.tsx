"use client"

import { useTransition } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Edit3, Power, Loader2, PackageSearch, ImageIcon } from "lucide-react"
import { alternarStatusProduto, excluirProduto } from "../_actions/produto1-actions"

interface AdminProdutosProps {
  produtos: any[]
}

export function AdminProdutos({ produtos }: AdminProdutosProps) {
  const [isPending, startTransition] = useTransition()

  if (produtos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-zinc-100">
        <PackageSearch className="size-12 text-zinc-300 mb-4" />
        <p className="text-zinc-500 font-medium text-center">
          Nenhum produto cadastrado.<br/>Clique em "Novo Produto" para começar.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {produtos.map((produto) => (
        <div 
          key={produto.id} 
          className={`flex items-center gap-4 p-4 bg-white rounded-3xl border border-zinc-100 shadow-sm hover:shadow-md transition-all ${!produto.isAtivo && 'opacity-60 grayscale-[0.5]'}`}
        >
          {/* Renderização da Imagem via URL */}
          <div className="size-20 bg-zinc-50 rounded-2xl overflow-hidden relative flex items-center justify-center border border-zinc-100 shrink-0">
             {produto.imageUrl ? (
               <img 
                src={produto.imageUrl} 
                alt={produto.nome} 
                className="w-full h-full object-cover"
               />
             ) : (
               <ImageIcon className="size-8 text-zinc-200" />
             )}
             
             {produto.isDestaque && (
               <div className="absolute top-0 left-0 bg-orange-600 text-[8px] text-white px-2 py-0.5 font-bold uppercase rounded-br-lg">
                 Destaque
               </div>
             )}
          </div>

          <div className="flex-grow min-w-0">
            <h4 className="font-black text-zinc-900 leading-tight uppercase italic tracking-tighter truncate">
              {produto.nome}
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="text-[10px] uppercase border-zinc-200">
                {produto.categoria?.nome || 'Sem categoria'}
              </Badge>
              <Badge variant="outline" className="text-[10px] uppercase border-zinc-200">
                Estoque: {produto.estoque} {produto.unidade}
              </Badge>
              <Badge 
                className={`border-none text-[10px] uppercase font-bold ${
                  produto.isAtivo 
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' 
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-100'
                }`}
              >
                {produto.isAtivo ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
          </div>

          <div className="text-right flex flex-col items-end gap-3 shrink-0">
            <div className="flex flex-col items-end leading-none">
              {produto.precoPromocao ? (
                <>
                  <span className="text-[10px] text-zinc-400 line-through">R$ {Number(produto.preco).toFixed(2)}</span>
                  <span className="font-black text-orange-600 text-lg italic">R$ {Number(produto.precoPromocao).toFixed(2)}</span>
                </>
              ) : (
                <span className="font-black text-zinc-900 text-lg italic">R$ {Number(produto.preco).toFixed(2)}</span>
              )}
            </div>

            <div className="flex gap-1">
              {/* Botão de Ativar/Desativar */}
              <Button 
                variant="ghost" 
                size="icon" 
                disabled={isPending}
                title={produto.isAtivo ? "Desativar" : "Ativar"}
                onClick={() => {
                  startTransition(async () => {
                    await alternarStatusProduto(produto.id, produto.isAtivo);
                  });
                }}
                className={`rounded-full size-8 ${produto.isAtivo ? 'text-zinc-400' : 'text-emerald-600 bg-emerald-50'}`}
              >
                {isPending ? <Loader2 className="size-3 animate-spin" /> : <Power className="size-4" />}
              </Button>

              {/* Botão Editar */}
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-orange-600 rounded-full size-8">
                <Edit3 className="size-4" />
              </Button>

              {/* Botão Remover */}
              <Button 
                variant="ghost" 
                size="icon" 
                disabled={isPending}
                onClick={() => {
                  if(confirm("Deseja realmente excluir este produto?")) {
                    startTransition(async () => {
                      await excluirProduto(produto.id);
                    });
                  }
                }}
                className="text-zinc-300 hover:text-red-600 hover:bg-red-50 rounded-full size-8"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}