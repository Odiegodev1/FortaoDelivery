import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { Flame } from "lucide-react";
import { ButtonGithub } from "@/components/ButtonGithub";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
      {/* Background Decorativo Sutil */}
      <div className="absolute inset-0 z-0 opacity-[0.03] grid grid-cols-6 gap-2 p-4 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <Flame key={i} className="size-24 text-orange-950" />
        ))}
      </div>

      <Card className="w-full max-w-md mx-auto z-10 rounded-[2.5rem] border-none shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden">
        <CardHeader className="space-y-1 pt-8 pb-6 flex flex-col items-center text-center">
          
          {/* Logo do Point do Fortão */}
          <div className="relative group mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative flex items-center justify-center bg-white rounded-full p-1.5 shadow-xl">
              <Image 
                src="/logo.png" // Certifique-se de que sua logo está em /public/logo.png
                alt="Logo Point do Fortão" 
                width={120} 
                height={120} 
                className="size-24 rounded-full object-cover transition-transform duration-500 group-hover:rotate-3" 
              />
            </div>
          </div>

          <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-zinc-950">
            Bem-vindo ao <span className="text-orange-600">Point</span>
          </CardTitle>
          <CardDescription className="text-zinc-500 font-medium max-w-xs pt-1">
            Conecte-se para fazer seu pedido e acompanhar suas entregas em Jaconé.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-10 pt-2 px-8 flex flex-col items-center space-y-6">
          <div className="w-full h-px bg-zinc-100 relative">
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-black uppercase text-zinc-400 tracking-widest">
              Entrar com
            </span>
          </div>

          {/* Botão de Login Social (Componente Separado) */}
          <ButtonGithub />
          
          <p className="text-center text-xs text-zinc-400 px-6 font-medium">
            Ao entrar, você concorda com nossos termos de serviço e política de privacidade.
          </p>
        </CardContent>
      </Card>

      {/* Rodapé Sutil */}
      <div className="mt-8 text-center z-10">
        <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest italic">
          Point do Fortão © 2024
        </p>
        <p className="text-[10px] font-medium text-zinc-400">
          Jaconé - Saquarema - RJ
        </p>
      </div>
    </div>
  );
}