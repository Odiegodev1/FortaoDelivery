"use server"

import { prisma } from "@/lib/prisma" // Ajuste o caminho conforme seu projeto
import { revalidatePath } from "next/cache"
import { Role } from "@/lib/generated/prisma"

// 1. Função para atualizar ou criar um horário
export async function upsertHorario(data: {
  diaSemana: string
  abertura: string
  fechamento: string
  isFechado: boolean
}) {
  try {
    
    // [OPCIONAL] Aqui você verificaria a sessão do NextAuth 
    // const session = await getServerSession(authOptions)
    // if (session?.user.role !== Role.ADMIN) throw new Error("Não autorizado")

    await prisma.horarioFuncionamento.upsert({
      where: { diaSemana: data.diaSemana },
      update: {
        abertura: data.abertura,
        fechamento: data.fechamento,
        isFechado: data.isFechado,
      },
      create: {
        diaSemana: data.diaSemana,
        abertura: data.abertura,
        fechamento: data.fechamento,
        isFechado: data.isFechado,
      },
    })

    // Limpa o cache das páginas que exibem o horário
    revalidatePath("/")
    revalidatePath("/admin/horarios") 

    return { success: true }
  } catch (error) {
    console.error("Erro ao salvar horário:", error)
    return { success: false, error: "Falha ao atualizar o horário." }
  }
}

// 2. Função para buscar todos os horários (Útil para o formulário)
export async function getHorarios() {
  return await prisma.horarioFuncionamento.findMany({
    orderBy: {
      // Ordenação lógica por dia da semana exigiria um switch ou campo extra, 
      // mas por enquanto pegamos todos.
      diaSemana: 'asc' 
    }
  })
}