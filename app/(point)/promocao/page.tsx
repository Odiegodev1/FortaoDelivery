
import { prisma } from "@/lib/prisma";
import { BadgePercent } from "lucide-react";
import { CardPromocao } from "./components/CardPromocao";

export default async function PromocoesPage() {
  const produtosNoBanco = await prisma.produto.findMany({
    where: {
      isAtivo: true,
      precoPromocao: { not: null },
    },
  });

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-32 pt-6">
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-900 p-2.5 rounded-2xl text-orange-500 shadow-xl">
            <BadgePercent size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-zinc-900 italic uppercase tracking-tighter">
              Promo <span className="text-orange-600">Fortão</span>
            </h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Ofertas exclusivas</p>
          </div>
        </div>
      </div>

      <main className="px-4 grid grid-cols-2 gap-4">
        {produtosNoBanco.map((p) => (
          <CardPromocao 
            key={p.id} 
            produto={{
              ...p,
              preco: p.preco.toString(),
              precoPromocao: p.precoPromocao?.toString()
            }} 
          />
        ))}
      </main>
    </div>
  );
}