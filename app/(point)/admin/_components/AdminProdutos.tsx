"use client"

import { useTransition, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, Edit3, Power, Loader2, PackageSearch, ImageIcon } from "lucide-react"
import { alternarStatusProduto, excluirProduto } from "../_actions/produto1-actions"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { FormProduto } from "./FormProduto"

interface AdminProdutosProps {
  produtos: any[]
  categorias: any[]
}

export function AdminProdutos({ produtos, categorias }: AdminProdutosProps) {
  const [isPending, startTransition] = useTransition()
  const [openId, setOpenId] = useState<string | null>(null)

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
          <div className="size-20 bg-zinc-50 rounded-2xl overflow-hidden relative flex items-center justify-center border border-zinc-100 shrink-0">
             {produto.imageUrl ? (
               <img src={produto.imageUrl} alt={produto.nome} className="w-full h-full object-cover"/>
             ) : (
               <ImageIcon className="size-8 text-zinc-200" />
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
              <Badge 
                className={`border-none text-[10px] uppercase font-bold ${
                  produto.isAtivo ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'
                }`}
              >
                {produto.isAtivo ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
          </div>

          <div className="text-right flex flex-col items-end gap-3 shrink-0">
            <div className="flex flex-col items-end leading-none">
              <span className="font-black text-zinc-900 text-lg italic">
                R$ {Number(produto.precoPromocao || produto.preco).toFixed(2)}
              </span>
            </div>

            <div className="flex gap-1">
              {/* CORREÇÃO AQUI: Adicionado chaves {} para não retornar o resultado da action */}
              <Button 
                variant="ghost" 
                size="icon" 
                disabled={isPending}
                onClick={() => {
                  startTransition(async () => {
                    await alternarStatusProduto(produto.id, produto.isAtivo);
                  });
                }}
                className={`rounded-full size-8 ${produto.isAtivo ? 'text-zinc-400' : 'text-emerald-600 bg-emerald-50'}`}
              >
                {isPending ? <Loader2 className="size-3 animate-spin" /> : <Power className="size-4" />}
              </Button>

              <Dialog open={openId === produto.id} onOpenChange={(val) => setOpenId(val ? produto.id : null)}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-zinc-400 hover:text-orange-600 rounded-full size-8"
                  >
                    <Edit3 className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border-none">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase italic">
                      Editar <span className="text-orange-600">Produto</span>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <FormProduto 
                    produto={produto} 
                    categorias={categorias} 
                    onSuccess={() => setOpenId(null)} 
                  />
                </DialogContent>
              </Dialog>

              {/* CORREÇÃO AQUI: Adicionado chaves {} para não retornar o resultado da action */}
              <Button 
                variant="ghost" 
                size="icon" 
                disabled={isPending}
                onClick={() => {
                  if (confirm("Deseja apagar esse produto?")) {
                    startTransition(async () => {
                      await excluirProduto(produto.id);
                    });
                  }
                }}
                className="text-zinc-300 hover:text-red-600 rounded-full size-8"
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