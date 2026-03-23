import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
 
    const { nome, endereco, pagamento, troco, itens } = body;

    // 1. Validação básica de entrada
    if (!itens || itens.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
    }

    // 2. Pegar apenas os IDs para consulta no banco
    const ids = itens.map((item: any) => item.id);

    // 3. Buscar os produtos no Prisma (A fonte da verdade)
    const produtosNoBanco = await prisma.produto.findMany({
      where: { 
        id: { in: ids } 
      },
    });

    // 4. Cruzar dados e calcular o Total Real
    let totalReal = 0;
    
    const itensValidados = itens.map((itemCarrinho: any) => {
      // Encontra o produto correspondente no banco
      const produtoBD = produtosNoBanco.find((p) => p.id === itemCarrinho.id);
      
      if (!produtoBD) {
        throw new Error(`Produto com ID ${itemCarrinho.id} não existe no estoque.`);
      }

      // Segurança: Sempre use o preço do BANCO, nunca o do Frontend
      const precoFinal = produtoBD.precoPromocao ?? produtoBD.preco;
      const subtotal = Number(precoFinal) * itemCarrinho.quantity;
      
      totalReal += subtotal;

      // Retornamos o objeto completo para o Frontend formatar o Zap
      return {
        id: produtoBD.id,
        nome: produtoBD.nome,
        quantidade: itemCarrinho.quantity,
        preco: Number(precoFinal),
        subtotal: subtotal
      };
    });

    // 5. Opcional: Salvar o pedido no banco (Histórico para o Dashboard do Fortão)
    // Se você tiver uma tabela de Pedidos, descomente abaixo:
    /*
    await prisma.pedido.create({
      data: {
        clienteNome: nome,
        endereco: endereco,
        metodoPagamento: pagamento,
        total: totalReal,
        status: "PENDENTE",
        itens: {
          create: itensValidados.map(i => ({
            produtoId: i.id,
            quantidade: i.quantidade,
            precoUnitario: i.preco
          }))
        }
      }
    });
    */

    // 6. Resposta de Sucesso
    return NextResponse.json({ 
      success: true, 
      totalValidado: totalReal,
      itensValidados: itensValidados,
      cliente: {
        nome,
        endereco,
        pagamento,
        troco: troco || "Não necessário"
      }
    });

  } catch (error: any) {
    console.error("ERRO NO CHECKOUT:", error.message);
    return NextResponse.json(
      { success: false, error: error.message || "Erro interno no servidor" }, 
      { status: 500 }
    );
  }
}