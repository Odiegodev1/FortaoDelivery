"use client"

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Loader2, ImageIcon } from "lucide-react"
import { criarProduto } from "../_actions/produto-actions"

export function AdminNovoProduto({ categorias }: { categorias: any[] }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [imageUrl, setImageUrl] = useState("")

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await criarProduto(formData)
      if (res.success) {
        setOpen(false)
        // O revalidatePath já cuida de atualizar a lista
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700 rounded-full gap-2 shadow-lg shadow-orange-200">
          <PlusCircle className="size-4" /> Novo Produto
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-[2rem] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">
            Novo <span className="text-orange-600">Produto</span>
          </DialogTitle>
        </DialogHeader>
        
       <form action={handleSubmit} className="space-y-4 pt-4">
          {/* Preview da Imagem via URL */}
          <div className="flex justify-center">
            <div className="size-32 bg-zinc-100 rounded-3xl border-2 border-dashed border-zinc-200 overflow-hidden flex items-center justify-center relative">
              {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="size-8 text-zinc-300" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem (Instagram, Imgur, etc)</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              placeholder="https://link-da-imagem.com/foto.jpg" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="rounded-xl" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Produto</Label>
            <Input id="nome" name="nome" placeholder="Ex: Heineken 600ml" required className="rounded-xl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preco">Preço (R$)</Label>
              <Input id="preco" name="preco" type="number" step="0.01" placeholder="12.50" required className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select name="categoriaId" required>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição (Opcional)</Label>
            <Input id="descricao" name="descricao" placeholder="Ex: Gelada e pronta para entrega" className="rounded-xl" />
          </div>

          <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-2xl border border-orange-100">
            <input type="checkbox" id="isDestaque" name="isDestaque" className="accent-orange-600 size-4" />
            <Label htmlFor="isDestaque" className="text-orange-900 font-bold cursor-pointer">Colocar em Destaque na Home?</Label>
          </div>

          <Button 
            disabled={isPending} 
            type="submit" 
            className="w-full bg-zinc-950 hover:bg-zinc-900 text-white py-6 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "CADASTRAR PRODUTO"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}