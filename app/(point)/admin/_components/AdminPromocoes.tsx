"use client"

import { useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tag, Trash2, Loader2, Zap } from "lucide-react"
import { aplicarPromocao, removerPromocao } from "../_actions/promo-actions"

export function AdminPromocoes({ produtos }: { produtos: any[] }) {
  const [isPending, startTransition] = useTransition()
  
  // Filtramos quem já está em promoção para a lista
  const emOferta = produtos.filter(p => p.precoPromocao !== null)
  // Filtramos quem NÃO está em promoção para o select
  const semOferta = produtos.filter(p => p.precoPromocao === null)

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Criar Nova Promoção */}
      <Card className="border-none shadow-xl rounded-[2rem]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 italic uppercase">
            <Zap className="size-5 text-orange-600 fill-orange-600" />
            Lançar Oferta
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              startTransition(async () => {
                await aplicarPromocao(formData);
                // Opcional: e.currentTarget.reset() para limpar o form após sucesso
              });
            }} 
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-bold">Escolha o Produto</label>
              <Select name="produtoId" required>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Selecione um item" />
                </SelectTrigger>
                <SelectContent>
                  {semOferta.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.nome} (R$ {Number(p.preco).toFixed(2)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold">Novo Preço Promocional (R$)</label>
              <Input 
                name="precoPromocao" 
                type="number" 
                step="0.01" 
                placeholder="9.90" 
                required 
                className="rounded-xl" 
              />
            </div>

            <Button 
              type="submit"
              disabled={isPending} 
              className="w-full bg-orange-600 hover:bg-orange-700 rounded-2xl h-12 font-bold uppercase tracking-tighter"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "ATIVAR PREÇO BAIXO"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Promoções Ativas */}
      <Card className="border-none shadow-xl rounded-[2rem]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 italic uppercase text-zinc-400">
            <Tag className="size-5" />
            Ofertas Ativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emOferta.length === 0 && (
              <p className="text-zinc-400 text-sm italic">Nenhuma promoção ativa agora.</p>
            )}
            {emOferta.map(p => (
              <div key={p.id} className="flex justify-between items-center p-4 bg-orange-50 rounded-2xl border border-orange-100 group">
                <div>
                  <p className="font-bold text-zinc-800">{p.nome}</p>
                  <p className="text-xs">
                    <span className="line-through text-zinc-400">R$ {Number(p.preco).toFixed(2)}</span>
                    <span className="ml-2 text-orange-600 font-black">R$ {Number(p.precoPromocao).toFixed(2)}</span>
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={isPending}
                  onClick={() => {
                    startTransition(async () => {
                      await removerPromocao(p.id);
                    });
                  }}
                  className="hover:bg-red-100 hover:text-red-600 rounded-full"
                >
                  {isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}