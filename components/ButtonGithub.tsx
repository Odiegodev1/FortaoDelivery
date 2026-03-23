"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github, Loader2 } from "lucide-react";
import { useState } from "react";

export function ButtonGithub() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // Inicia o fluxo de login do NextAuth com o provedor 'github'
    // O callbackUrl redireciona o usuário para a home após o login sucesso
    await signIn("github", { redirectTo: "/admin" });
  };

  return (
    <Button 
      onClick={handleLogin}
      disabled={loading}
      className="w-full h-14 bg-zinc-950 hover:bg-orange-600 text-white rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg active:scale-95 disabled:opacity-70 group"
    >
      {loading ? (
        <Loader2 className="size-6 animate-spin text-orange-200" />
      ) : (
        <Github className="size-6 transition-transform group-hover:scale-110" />
      )}
      
      <span className="font-black uppercase tracking-widest text-sm italic">
        {loading ? "Conectando..." : "Entrar com GitHub"}
      </span>
    </Button>
  );
}