"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function excluirProduto(id: string) {
  try {
    await prisma.produto.delete({ where: { id } })
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function alternarStatusProduto(id: string, statusAtual: boolean) {
  try {
    await prisma.produto.update({
      where: { id },
      data: { isAtivo: !statusAtual }
    })
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}