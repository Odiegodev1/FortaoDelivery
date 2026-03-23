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

export async function editarProduto(id: string, data: any) {
  try {
    await prisma.produto.update({
      where: { id },
      data: {
        nome: data.nome,
        // Garantindo que o preço seja número
        preco: parseFloat(data.preco),
        // Se precoPromocao estiver vazio, enviamos null
        precoPromocao: data.precoPromocao ? parseFloat(data.precoPromocao) : null,
        estoque: parseInt(data.estoque) || 0,
        unidade: data.unidade,
        imageUrl: data.imageUrl,
        categoriaId: data.categoriaId,
        isDestaque: data.isDestaque,
      },
    });

    // Isso limpa o cache e atualiza a lista de produtos na hora
    revalidatePath("/admin"); 
    return { success: true };
  } catch (error) {
    console.error("Erro Prisma:", error);
    throw new Error("Falha ao atualizar banco de dados");
  }
}