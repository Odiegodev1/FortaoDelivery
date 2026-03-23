import { prisma } from "@/lib/prisma";
import { ArrowLeft, Filter, PackageSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BtnAdicionarCarrinho } from "@/components/BtnAdicionarCarrinho";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Busca a categoria e os produtos vinculados a ela
  const categoriaComProdutos = await prisma.categoria.findUnique({
    where: { slug },
    include: {
      produtos: {
        where: { isAtivo: true }, // Apenas o que está à venda
        orderBy: { nome: 'asc' }
      }
    }
  });

  if (!categoriaComProdutos) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h1 className="text-2xl font-black uppercase italic">Categoria não encontrada</h1>
        <Link href="/" className="mt-4 text-orange-600 font-bold underline">Voltar para a Home</Link>
      </div>
    );
  }

  // Serialização manual para evitar erro de Decimal do Prisma
  const produtos = categoriaComProdutos.produtos.map(p => ({
    id: p.id,
    nome: p.nome,
    preco: Number(p.preco),
    precoPromocao: p.precoPromocao ? Number(p.precoPromocao) : null,
    imageUrl: p.imageUrl,
  }));

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-4 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/inicio" className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
              <ArrowLeft className="size-5 text-zinc-900" />
            </Link>
            <h1 className="text-xl font-black uppercase italic tracking-tighter text-zinc-900 leading-none">
              {categoriaComProdutos.nome}
            </h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Filter className="size-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {produtos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {produtos.map((produto) => {
              const valorFinal = produto.precoPromocao ?? produto.preco;
              
              return (
                <div 
                  key={produto.id} 
                  className="bg-white rounded-[2rem] p-4 border border-zinc-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square bg-zinc-50 rounded-3xl mb-3 flex items-center justify-center relative overflow-hidden border border-zinc-100">
                      {produto.imageUrl ? (
                        <img 
                          src={produto.imageUrl} 
                          alt={produto.nome}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-2"
                        />
                      ) : (
                        <div className="size-16 bg-zinc-200 rounded-full" />
                      )}
                      
                      {produto.precoPromocao && (
                        <div className="absolute top-2 left-2 bg-orange-600 text-[8px] text-white px-2 py-1 font-black rounded-full uppercase">
                          Oferta
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-zinc-800 text-sm line-clamp-2 h-10 italic uppercase leading-tight tracking-tighter">
                      {produto.nome}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                      {produto.precoPromocao && (
                        <span className="text-[10px] text-zinc-400 line-through">
                          R$ {produto.preco.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                      <span className="text-orange-600 font-black text-lg italic">
                        R$ {valorFinal.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    
                    {/* Botão de Adicionar que você já criou */}
                    <BtnAdicionarCarrinho produto={produto} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <PackageSearch className="size-12 text-zinc-200 mb-4" />
            <p className="text-zinc-400 font-medium italic">O estoque de {categoriaComProdutos.nome} está zerado.</p>
            <Link href="/" className="mt-4 text-orange-600 font-bold underline">Ver outros itens</Link>
          </div>
        )}
      </main>
    </div>
  );
}