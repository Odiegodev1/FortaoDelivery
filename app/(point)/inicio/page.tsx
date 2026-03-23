import Footer from "@/components/Footer";
import { CardCategoria } from "./_components/cardCategoria";
import { CardDestaque } from "./_components/CardDestaque";
import { CardInfo } from "./_components/CardInfo";
import { ListCategoria } from "./_components/ListCategoria";

export default function Home(){
    const currentYear = new Date().getFullYear();
    return(
        <div className="flex p-4 space-y-10 pt-4 flex-col min-h-full w-full">
            <CardInfo />
            <ListCategoria />
           <CardDestaque />
           <CardCategoria />
           <footer className="w-full py-10 mt-8 border-t border-zinc-100">
      <div className="flex flex-col items-center justify-center text-center px-4">
        
        {/* Linha Principal de Copyright */}
        <p className="text-sm font-semibold tracking-tight text-zinc-900 uppercase">
          © {currentYear} Point do Fortão
        </p>
        
        {/* Linha de Detalhes e Localização */}
        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
          Todos os Direitos Reservados — Jaconé, Saquarema
        </p>

        {/* Detalhe minimalista: uma pequena bolinha ou traço para finalizar */}
        <div className="mt-4 size-1 bg-zinc-200 rounded-full" />
      </div>
    </footer>
        </div>
    )
}