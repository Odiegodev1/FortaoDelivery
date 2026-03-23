// src/app/_components/CardInfo.tsx
import { prisma } from "@/lib/prisma";
import { CardInfoClient } from "../CardInfoClient";


export async function CardInfo() {
  // Buscando da tabela correta: horarioFuncionamento
  const horarios = await prisma.horarioFuncionamento.findMany({
    orderBy: {
      // Opcional: você pode ordenar se desejar, mas o map no cliente resolve
      diaSemana: 'asc' 
    }
  });
  
  return (
    <CardInfoClient 
      horarios={horarios} 
      endereco="Rua 77 com a 13, Jaconé - Saquarema, RJ"
      telefone="(22) 99912-3456"
    />
  );
}