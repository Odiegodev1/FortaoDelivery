// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 bg-white border-b border-zinc-200">
      <div className="text-xl font-bold">MeuProjeto</div>
      <div className="space-x-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link href="/configuracoes" className="hover:text-blue-600">Configurações</Link>
      </div>
    </nav>
  );
}