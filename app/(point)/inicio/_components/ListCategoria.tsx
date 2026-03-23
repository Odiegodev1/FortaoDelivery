// src/app/_components/ListCategoria.tsx
import { Search } from "lucide-react";
import { SelectionCategoria } from "./SelectionCategoria";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export async function ListCategoria() {
  // Buscamos as categorias reais do banco do Fortão
  const categorias = await prisma.categoria.findMany({
    orderBy: { nome: 'asc' }
  });

  return (
    <div className="flex items-center justify-between gap-4 p-2 bg-zinc-50/50 rounded-3xl border border-zinc-100 shadow-sm backdrop-blur-sm">
      {/* Passamos as categorias reais para o componente de cliente */}
      <SelectionCategoria categorias={categorias} />

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full size-10 border-zinc-200 bg-white hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 shadow-sm active:scale-90"
        >
          <Search className="size-5" />
        </Button>
      </div>
    </div>
  );
}