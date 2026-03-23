"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Save, Package } from "lucide-react";

import { criarProduto } from "../_actions/produto-actions";
import { editarProduto } from "../_actions/produto1-actions";

interface FormProdutoProps {
  produto?: any; // Produto opcional para o modo edição
  categorias: any[];
  onSuccess?: () => void;
}

export function FormProduto({ produto, categorias, onSuccess }: FormProdutoProps) {
  const [isPending, startTransition] = useTransition();
  const isEditing = !!produto;

  // Inicializa o formulário com os dados do produto ou valores padrão
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      nome: produto?.nome || "",
      preco: produto?.preco ? Number(produto.preco) : "",
      precoPromocao: produto?.precoPromocao ? Number(produto.precoPromocao) : "",
      estoque: produto?.estoque || "",
      unidade: produto?.unidade || "un",
      categoriaId: produto?.categoriaId || "",
      imageUrl: produto?.imageUrl || "",
      isDestaque: produto?.isDestaque || false,
    }
  });

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      try {
        if (isEditing) {
          await editarProduto(produto.id, data);
        } else {
          await criarProduto(data);
        }
        if (onSuccess) onSuccess();
      } catch (error) {
        alert("Erro ao salvar produto. Verifique os dados.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-6">
      <div className="grid gap-4">
        {/* Nome do Produto */}
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase text-zinc-400 italic">Nome do Produto</Label>
          <Input 
            {...register("nome")} 
            placeholder="Ex: Cerveja Brahma 350ml" 
            required 
            className="rounded-2xl bg-zinc-50 border-none h-12 focus-visible:ring-orange-600 font-bold italic"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Preço Normal */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-zinc-400 italic">Preço Normal (R$)</Label>
            <Input 
              {...register("preco")} 
              type="number" 
              step="0.01" 
              placeholder="0.00"
              required 
              className="rounded-2xl bg-zinc-50 border-none h-12 focus-visible:ring-orange-600 font-bold"
            />
          </div>
          {/* Preço Promoção */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-orange-600 italic">Preço Promoção (R$)</Label>
            <Input 
              {...register("precoPromocao")} 
              type="number" 
              step="0.01" 
              placeholder="Opcional"
              className="rounded-2xl bg-orange-50 border-none h-12 focus-visible:ring-orange-600 font-bold text-orange-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Categoria */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-zinc-400 italic">Categoria</Label>
            <Select 
              onValueChange={(value) => setValue("categoriaId", value)} 
              defaultValue={produto?.categoriaId}
            >
              <SelectTrigger className="rounded-2xl bg-zinc-50 border-none h-12 font-bold italic">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {categorias.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} className="font-bold italic uppercase text-xs">
                    {cat.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Estoque */}
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase text-zinc-400 italic">Estoque Atual</Label>
            <Input 
              {...register("estoque")} 
              type="number" 
              placeholder="Qtd" 
              className="rounded-2xl bg-zinc-50 border-none h-12 font-bold"
            />
          </div>
        </div>

        {/* URL da Imagem */}
        <div className="space-y-2">
          <Label className="text-[10px] font-black uppercase text-zinc-400 italic">URL da Imagem</Label>
          <Input 
            {...register("imageUrl")} 
            placeholder="https://..." 
            className="rounded-2xl bg-zinc-50 border-none h-12 text-xs"
          />
        </div>

        {/* Checkbox Destaque */}
        <div className="flex items-center space-x-3 bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
          <Checkbox 
            id="destaque" 
            checked={watch("isDestaque")}
            onCheckedChange={(checked) => setValue("isDestaque", !!checked)}
            className="border-orange-600 data-[state=checked]:bg-orange-600"
          />
          <Label htmlFor="destaque" className="text-white font-black uppercase italic text-[10px] tracking-widest flex items-center gap-2 cursor-pointer">
             Produto em Destaque <Package className="size-3 text-orange-500" />
          </Label>
        </div>
      </div>

      <Button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-8 rounded-[2rem] font-black uppercase italic tracking-widest text-sm shadow-xl shadow-orange-200 transition-all active:scale-95"
      >
        {isPending ? (
          <Loader2 className="animate-spin mr-2" />
        ) : (
          <><Save className="mr-2 size-4" /> {isEditing ? "Salvar Alterações" : "Cadastrar Produto"}</>
        )}
      </Button>
    </form>
  );
}