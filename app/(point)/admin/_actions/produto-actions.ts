"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function criarProduto(formData: FormData) {
  const nome = formData.get("nome") as string
  const preco = parseFloat(formData.get("preco") as string)
  const categoriaId = formData.get("categoriaId") as string
  const descricao = formData.get("descricao") as string
  const imageUrl = formData.get("imageUrl") as string // Novo campo capturado
  const isDestaque = formData.get("isDestaque") === "on"

  try {
    await prisma.produto.create({
      data: {
        nome,
        preco,
        categoriaId,
        descricao,
        imageUrl, // Salva a URL no banco
        isDestaque,
        estoque: 99,
        unidade: "un",
      },
    })

    revalidatePath("/admin")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}