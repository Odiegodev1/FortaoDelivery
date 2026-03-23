"use client";

import { useCart } from "@/app/store/useCart";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function BtnAdicionarCarrinho({ produto }: { produto: any }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <Button 
      onClick={() => addItem(produto)}
      size="sm" 
      className="bg-zinc-900 hover:bg-orange-600 rounded-xl h-8 w-8 p-0"
    >
      <Plus className="size-4" />
    </Button>
  );
}