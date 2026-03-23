// src/app/_components/CardDestaque.tsx
import { prisma } from "@/lib/prisma";
import { CardDestaqueClient } from "./CardDestaqueClient";

export async function CardDestaque() {
  // Busca apenas produtos ativos e que são destaque
  const produtosDestaqueRaw = await prisma.produto.findMany({
    where: {
      isDestaque: true,
      
      isAtivo: true,
    },
    take: 10, // Limita para não pesar o carrossel
  });

  // Converte os Decimais para Numbers para o Client Component aceitar
  const produtos = produtosDestaqueRaw.map(p => ({
    id: p.id,
    nome: p.nome,
    preco: Number(p.preco),
    precoPromocao: p.precoPromocao ? Number(p.precoPromocao) : null,
    imageUrl: p.imageUrl,
    isDestaque: p.isDestaque
  }));

  return <CardDestaqueClient produtos={produtos} />;
}