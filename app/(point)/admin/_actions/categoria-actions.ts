"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function criarCategoria(formData: FormData) {
  const nome = formData.get("nome") as string
  const color = formData.get("color") as string
  
  // Gerar slug simples
  const slug = nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Espaços para -

  try {
    await prisma.categoria.create({
      data: {
        nome,
        slug,
        color: color || "from-orange-600/80",
      },
    })

    revalidatePath("/admin")
    revalidatePath("/") // Revalida a home onde as categorias aparecem
    return { success: true }
  } catch (error) {
    console.error("Erro ao criar categoria:", error)
    return { success: false, error: "Nome de categoria já existe ou erro no banco." }
  }
}