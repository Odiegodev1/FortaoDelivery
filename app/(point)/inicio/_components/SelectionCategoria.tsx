"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { LayoutGrid } from "lucide-react"

interface SelectionCategoriaProps {
  categorias: {
    id: string;
    nome: string;
    slug: string;
  }[]
}

export function SelectionCategoria({ categorias }: SelectionCategoriaProps) {
  const router = useRouter()

  return (
    <Select onValueChange={(value) => router.push(`/categoria/${value}`)}>
      <SelectTrigger className="w-[180px] bg-transparent border-none shadow-none focus:ring-0 font-bold text-zinc-900 uppercase italic tracking-tighter">
        <div className="flex items-center gap-2">
          <LayoutGrid className="size-4 text-orange-600" />
          <SelectValue placeholder="CATEGORIAS" />
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-zinc-100 shadow-xl">
        {categorias.length === 0 && (
          <p className="p-4 text-xs text-zinc-400 italic">Nenhuma categoria...</p>
        )}
        {categorias.map((cat) => (
          <SelectItem 
            key={cat.id} 
            value={cat.slug}
            className="font-bold text-zinc-700 focus:bg-orange-50 focus:text-orange-600 rounded-xl cursor-pointer uppercase text-xs italic"
          >
            {cat.nome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}