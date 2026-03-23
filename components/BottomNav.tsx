// src/components/BottomNav.tsx
import Link from 'next/link';
import { Home, Search, Calendar, User } from 'lucide-react';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t shadow-md shadow-taupe-600 border-zinc-200 md:hidden">
      <div className="flex h-full w-full items-center justify-between grid-cols-4 mx-auto font-medium">

        <Link href="/inicio" className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-50 group">
          <Home className="w-5 h-5 mb-1 text-zinc-500 group-hover:text-blue-600" />
          <span className="text-xs text-zinc-500 group-hover:text-blue-600">Início</span>
        </Link>
        
        <Link href="/promocao" className="inline-flex flex-col items-center justify-center px-5 hover:bg-zinc-50 group">
          <Search className="w-5 h-5 mb-1 text-zinc-500 group-hover:text-blue-600" />
          <span className="text-xs text-zinc-500 group-hover:text-blue-600">Promoção</span>
        </Link>

       
     
      </div>
    </nav>
  );
}