// src/app/layout.tsx
import BottomNav from '@/components/BottomNav';
import { FloatingCart } from '@/components/FloatingCart';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   
      <div className="min-h-screen bg-zinc-50">
        <main className="pb-20"> {/* pb-20 compensa a altura da BottomNav */}
          {children}
        </main>
        <FloatingCart />
        <BottomNav />
      </div>

  );
}