// src/app/_components/CardInfo.tsx
import { prisma } from "@/lib/prisma";
import { CardInfoClient } from "../CardInfoClient";

// ADICIONE ESTA LINHA AQUI:
// Isso diz ao Next.js para atualizar os dados a cada 0 segundos (sempre fresco)
export const revalidate = 0; 

export async function CardInfo() {
  const horarios = await prisma.horarioFuncionamento.findMany({
    orderBy: {
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