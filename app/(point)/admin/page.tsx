import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, LayoutGrid, Package, Clock, Tag } from "lucide-react";
import { AdminProdutos } from "./_components/AdminProdutos";
import { AdminHorario } from "./_components/AdminHorario";
import { prisma } from "@/lib/prisma";
import { AdminNovoProduto } from "./_components/AdminNovoProduto";
import { AdminCategorias } from "./_components/AdminCategorias";
import { AdminPromocoes } from "./_components/AdminPromocoes";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const categorias = await prisma.categoria.findMany();
// Busca os produtos brutos do banco
  const produtosRaw = await prisma.produto.findMany({
    include: { categoria: true },
    orderBy: { createdAt: 'desc' }
  });


  const sesseion = await auth();
if(!sesseion?.user){
  return redirect("/inicio")
}

  // CONVERSÃO AQUI: Transforma Decimal em Number para o Serializer do Next.js não reclamar
  const produtos = produtosRaw.map(p => ({
    ...p,
    preco: Number(p.preco),
    precoPromocao: p.precoPromocao ? Number(p.precoPromocao) : null,
    // Opcional: Converter datas para string se der erro nelas também
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Header do Admin */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-950">
            Painel do <span className="text-orange-600">Fortão</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium">Gerencie seu estoque e funcionamento</p>
        </div>
       <AdminNovoProduto categorias={categorias} />
      </div>

      <Tabs defaultValue="produtos" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-[600px] rounded-full bg-zinc-100 p-1">
          <TabsTrigger value="produtos" className="rounded-full gap-2"><Package className="size-4"/> Itens</TabsTrigger>
          <TabsTrigger value="categorias" className="rounded-full gap-2"><LayoutGrid className="size-4"/> Categorias</TabsTrigger>
          <TabsTrigger value="promocoes" className="rounded-full gap-2"><Tag className="size-4"/> Promo</TabsTrigger>
          <TabsTrigger value="horario" className="rounded-full gap-2"><Clock className="size-4"/> Horário</TabsTrigger>
        </TabsList>

        {/* Conteúdo de cada aba abaixo */}
        <div className="mt-8">
          <TabsContent value="produtos"><AdminProdutos produtos={produtos} /></TabsContent>
          <TabsContent value="categorias"><AdminCategorias categorias={categorias} /></TabsContent>
          <TabsContent value="promocoes"><AdminPromocoes produtos={produtos} /></TabsContent>
          <TabsContent value="horario"><AdminHorario /></TabsContent>
        </div>
      </Tabs>
    </div>
  );
}