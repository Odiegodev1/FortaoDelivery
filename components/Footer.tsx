

// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="p-6 text-center border-t border-zinc-200 text-sm text-zinc-500">
      © {new Date().getFullYear()} MeuProjeto - Todos os direitos reservados.
    </footer>
  );
}