"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LayoutGrid, Plus, Loader2 } from "lucide-react"
import { criarCategoria } from "../_actions/categoria-actions"

export function AdminCategorias({ categorias }: { categorias: any[] }) {
  const [isPending, startTransition] = useTransition()
  const [nome, setNome] = useState("")

  async function clientAction(formData: FormData) {
    startTransition(async () => {
      const res = await criarCategoria(formData)
      if (res.success) setNome("") // Limpa o campo se der certo
    })
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Formulário de Criação */}
      <Card className="border-none shadow-xl rounded-[2rem]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="size-5 text-orange-600" />
            Nova Categoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={clientAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Categoria</Label>
              <Input 
                id="nome" 
                name="nome" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Cervejas, Combos, Destilados" 
                required 
                className="rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Cor do Gradiente (Tailwind)</Label>
              <Input 
                id="color" 
                name="color" 
                defaultValue="from-orange-600/80" 
                placeholder="from-blue-600/80" 
                className="rounded-xl"
              />
              <p className="text-[10px] text-zinc-400">Padrão: from-orange-600/80</p>
            </div>

            <Button 
              disabled={isPending} 
              className="w-full bg-zinc-950 rounded-2xl h-12 font-bold"
            >
              {isPending ? <Loader2 className="animate-spin" /> : "CRIAR CATEGORIA"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Lista de Categorias Atuais */}
      <Card className="border-none shadow-xl rounded-[2rem]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutGrid className="size-5 text-zinc-400" />
            Categorias Ativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categorias.length === 0 && (
              <p className="text-zinc-500 text-sm">Nenhuma categoria criada.</p>
            )}
            {categorias.map((cat) => (
              <div key={cat.id} className="flex justify-between items-center p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                <span className="font-bold text-zinc-700">{cat.nome}</span>
                <span className="text-[10px] bg-zinc-200 px-2 py-1 rounded-full text-zinc-500 uppercase font-bold">
                  /{cat.slug}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}