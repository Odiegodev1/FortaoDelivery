import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/public/logo.png"; // Imagem padrão se não houver uma por categoria

export async function CardCategoria() {
  const categorias = await prisma.categoria.findMany({
    orderBy: { nome: 'asc' }
  });

  return (
    <div className="px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black uppercase italic tracking-tighter text-zinc-900">
          Explorar <span className="text-orange-600">Categorias</span>
        </h2>
        <div className="h-[2px] flex-grow ml-4 bg-zinc-100" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categorias.map((cat) => (
          <Link 
            key={cat.id} 
            href={`/categoria/${cat.slug}`}
            className="group relative h-40 w-full overflow-hidden rounded-[2rem] bg-zinc-100 shadow-md active:scale-95 transition-all duration-300"
          >
            {/* Usamos o Banner padrão ou a imagem da categoria se você decidir adicionar esse campo depois */}
            <Image
              src={Banner}
              alt={cat.nome}
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* O gradiente usa a cor vinda do banco (ex: from-orange-600/80) */}
            <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent opacity-90 group-hover:opacity-100 transition-opacity`} />

            <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
              <span className="text-sm font-bold border-4  bg-white font-black uppercase tracking-widest text-black  drop-shadow-md text-center px-2">
                {cat.nome}
              </span>
              <div className="mt-1 w-0 h-1 bg-white rounded-full transition-all duration-300 group-hover:w-8" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}