// src/app/_components/CardInfo.tsx
import { prisma } from "@/lib/prisma";
import { CardInfoClient } from "../CardInfoClient";

export const revalidate = 0; // Força revalidação instantânea

export async function CardInfo() {
  // Adicionando um timestamp ou log para você ver no console da Vercel que ele executou
  console.log("Buscando horários no banco: ", new Date().toISOString());

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