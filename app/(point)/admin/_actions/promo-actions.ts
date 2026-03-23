"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function aplicarPromocao(formData: FormData) {
  const produtoId = formData.get("produtoId") as string
  const precoPromocao = parseFloat(formData.get("precoPromocao") as string)

  try {
    await prisma.produto.update({
      where: { id: produtoId },
      data: { precoPromocao },
    })

    revalidatePath("/admin")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

export async function removerPromocao(produtoId: string) {
  try {
    await prisma.produto.update({
      where: { id: produtoId },
      data: { precoPromocao: null },
    })
    revalidatePath("/admin")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}