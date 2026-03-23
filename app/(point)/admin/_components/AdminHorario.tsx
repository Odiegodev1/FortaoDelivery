import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminHorarioItem } from "./AdminHorarioItem";
import { getHorarios } from "../_actions/horario-actions";

export async function AdminHorario() {
  // Busca os dados do Prisma (Server Side)
  const horariosDoBanco = await getHorarios();
  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  return (
    <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
      <CardHeader className="bg-white">
        <CardTitle className="text-xl font-bold italic uppercase tracking-tighter">
          Horário de <span className="text-orange-600">Funcionamento</span>
        </CardTitle>
        <CardDescription>
          O sistema fechará automaticamente o carrinho fora destes horários.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {dias.map((dia) => {
          // Procura se já existe dado desse dia no banco
          const dadoBanco = horariosDoBanco.find(h => h.diaSemana === dia);
          
          return (
            <AdminHorarioItem 
              key={dia} 
              dia={dia}
              defaultAbertura={dadoBanco?.abertura}
              defaultFechamento={dadoBanco?.fechamento}
              defaultAtivo={dadoBanco ? !dadoBanco.isFechado : true}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}